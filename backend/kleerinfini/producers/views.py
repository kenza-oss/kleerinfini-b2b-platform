from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import ProducerProfile, Certification
from .serializers import CertificationSerializer, ProducerProfileSerializer, ProducerProfileCreateSerializer
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsProducer

class ProducerProfileViewSet(viewsets.ModelViewSet):
    queryset = ProducerProfile.objects.all()
    serializer_class = ProducerProfileSerializer
    permission_classes = [IsAuthenticated, IsProducer]

    def get_queryset(self):
        if self.request.user.is_staff:
            return ProducerProfile.objects.all()
        return ProducerProfile.objects.filter(user=self.request.user)

class ProducerDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsProducer]
    @swagger_auto_schema(
        operation_description="Récupère le tableau de bord d'un producteur avec ses statistiques, certifications et informations",
        operation_summary="Tableau de bord producteur",
        manual_parameters=[
            openapi.Parameter(
                'pk',
                openapi.IN_PATH,
                description="ID du producteur",
                type=openapi.TYPE_INTEGER,
                required=True
            ),
        ],
        responses={
            200: openapi.Response(
                description="Tableau de bord récupéré avec succès",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'stats': openapi.Schema(type=openapi.TYPE_OBJECT, description="Statistiques du producteur"),
                        'certifications': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT), description="Liste des certifications"),
                        'documents': openapi.Schema(type=openapi.TYPE_STRING, description="URL des documents"),
                        'company_name': openapi.Schema(type=openapi.TYPE_STRING, description="Nom de l'entreprise"),
                        'phone': openapi.Schema(type=openapi.TYPE_STRING, description="Téléphone"),
                        'address': openapi.Schema(type=openapi.TYPE_STRING, description="Adresse"),
                        'user': openapi.Schema(type=openapi.TYPE_STRING, description="Email de l'utilisateur"),
                        'user_id': openapi.Schema(type=openapi.TYPE_INTEGER, description="ID de l'utilisateur"),
                    }
                )
            ),
            404: openapi.Response(description="Producteur non trouvé"),
        }
    )
    def get(self, request, pk):
        try:
            producer = ProducerProfile.objects.get(pk=pk)
            certifications = [
                {
                    "id": cert.id,
                    "name": cert.name,
                    "description": cert.description,
                    "issued_by": cert.issued_by,
                    "valid_until": cert.valid_until,
                }
                for cert in producer.certifications.all()
            ]
            data = {
                "stats": producer.stats,
                "certifications": certifications,
                "documents": producer.documents.url if producer.documents else None,
                "company_name": producer.company_name,
                "phone": producer.phone,
                "address": producer.address,
                "user": producer.user.email,
                "user_id": producer.user.id,
            }
            return Response(data)
        except ProducerProfile.DoesNotExist:
            return Response(
                {"error": "Producteur non trouvé"}, 
                status=status.HTTP_404_NOT_FOUND
            )

    @swagger_auto_schema(
        operation_description="Met à jour les informations du tableau de bord d'un producteur",
        operation_summary="Mettre à jour le profil producteur",
        request_body=ProducerProfileSerializer,
        responses={
            200: ProducerProfileSerializer,
            404: 'Producteur non trouvé',
            403: 'Permission refusée'
        }
    )
    def put(self, request, pk):
        try:
            producer = ProducerProfile.objects.get(pk=pk)
            
            # Vérifier que l'utilisateur peut modifier ce profil
            if not request.user.is_staff and producer.user != request.user:
                return Response(
                    {"error": "Vous n'avez pas la permission de modifier ce profil"},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            serializer = ProducerProfileSerializer(producer, data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except ProducerProfile.DoesNotExist:
            return Response(
                {"error": "Producteur non trouvé"},
                status=status.HTTP_404_NOT_FOUND
            )

class CertificationListCreateAPIView(generics.ListCreateAPIView):
    """
    Liste et création des certifications
    """
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

class CertificationRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Récupération, modification et suppression d'une certification
    """
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

# CRUD Views pour les Producteurs
class ProducerProfileListCreateAPIView(generics.ListCreateAPIView):
    """
    Liste et création des profils producteurs
    """
    queryset = ProducerProfile.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProducerProfileCreateSerializer
        return ProducerProfileSerializer

class ProducerProfileRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Récupération, modification et suppression d'un profil producteur
    """
    queryset = ProducerProfile.objects.all()
    serializer_class = ProducerProfileSerializer
