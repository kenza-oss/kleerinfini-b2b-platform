import json
import hmac
import hashlib
import logging
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.utils.translation import gettext as _
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from chargily_pay import ChargilyClient
from chargily_pay.entity import Customer, Address, Product, Price, PaymentLink, PaymentItem

from subscriptions.models import Subscription
from subscriptions.utils import handle_successful_payment

from .utils import activate_subscription

logger = logging.getLogger(__name__)


class UploadPaymentProofView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                name="proof",
                in_=openapi.IN_FORM,
                type=openapi.TYPE_FILE,
                description="Payment proof file",
                required=True
            )
        ],
        responses={
            200: openapi.Response("Upload successful"),
            404: openapi.Response("No subscription associated with user"),
        }
    )

    

    def post(self, request):
        proof_file = request.FILES.get("proof")
        user = request.user

        try:
            subscription = Subscription.objects.get(user=user)
            subscription.proof_file = proof_file
            subscription.status = "pending_validation"
            subscription.save()
            return Response({"message": _("Effective payment has been raised ✅")}, status=status.HTTP_200_OK)
        except Subscription.DoesNotExist:
            return Response({"error": _("There is no subscription associated with this user")}, status=status.HTTP_404_NOT_FOUND)


class ChargilyPaymentLinkView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Create Chargily payment link",
        responses={
            200: openapi.Response("Payment link created"),
            500: openapi.Response("Payment link creation failed"),
        }
    )

    def post(self, request):
        user = request.user
        chargily = ChargilyClient(
            key=settings.CHARGILY_KEY,
            secret=settings.CHARGILY_SECRET,
            url=settings.CHARGILY_URL
        )

        try:
            customer = Customer(
                name=user.email,
                email=user.email,
                address=Address(address="Algeria", state="Algiers", country="DZ")
            )
            customer_response = chargily.create_customer(customer)
            customer_id = customer_response["id"]

            product = Product(
                name="Abonnement annuel 1500 DA",
                description="Abonnement producteur annuel"
            )
            product_response = chargily.create_product(product)
            product_id = product_response["id"]

            price = Price(
                amount=1500,  # in centimes
                currency="dzd",
                product_id=product_id
            )
            price_response = chargily.create_price(price)
            price_id = price_response["id"]

            checkout = PaymentLink(
                name=f"Paiement abonnement pour {user.email}",
                items=[PaymentItem(price=price_id, quantity=1)]
            )
            payment_link_response = chargily.create_payment_link(checkout)
            print("Payment link response:", payment_link_response)

            subscription, _ = Subscription.objects.get_or_create(user=user)
            subscription.chargily_payment_link_id = payment_link_response.get("id")
            subscription.status = "pending_validation"
            subscription.save()


            return Response({
                "message": "Proceed to payment.",
                "payment_url": payment_link_response.get("url")
            })

        except Exception as e:
            logger.error(f"Error creating payment link: {str(e)}")
            return Response({"error": "Payment link creation failed"}, status=500)


@csrf_exempt
@require_POST
def chargily_webhook(request):
    try:
        payload = request.body.decode('utf-8')
        data = json.loads(payload)
        event_type = data.get("type")
        checkout_data = data.get("data", {})
        
        
        payment_status = checkout_data.get("status")  

        print("Webhook data:", data)
        print("Payment status:", payment_status)

        if payment_status == "paid":  
            checkout_id = checkout_data.get("id")
            payment_link_id = checkout_data.get("payment_link_id")
            
            subscription = Subscription.objects.filter(
                chargily_payment_link_id=payment_link_id
            ).first()
            
            if subscription:
                subscription.chargily_checkout_id = checkout_id
                subscription.status = "active"
                subscription.is_online_payment = True
                subscription.start_date = timezone.now().date()
                subscription.end_date = timezone.now().date() + timedelta(days=365)
                subscription.save()
                return JsonResponse({"message": "Subscription activated"}, status=200)
            
            return JsonResponse({"error": "Subscription not found"}, status=404)
            
        return JsonResponse({"message": "Event not processed"}, status=200)
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        return JsonResponse({"error": "Internal server error"}, status=500)