from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.utils.translation import gettext as _
import logging
from notifications.models import Notification
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

User = get_user_model()

logger = logging.getLogger(__name__)

class MessageListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(operation_summary="List all messages related to the authenticated user")

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(
            sender=user
        ).union(
            Message.objects.filter(receiver=user)
        ).order_by('-timestamp')
    
    @swagger_auto_schema(
        operation_summary="Send a message",
        request_body=MessageSerializer,
        responses={201: MessageSerializer()}
    )

    def perform_create(self, serializer):
     try:
        message = serializer.save(sender=self.request.user)

        
        message_data = {
            'id': str(message.id),
            'sender': str(message.sender_id),
            'receiver': str(message.receiver_id),
            'content': message.content,
            'timestamp': message.timestamp.isoformat(),
        }

        # Send message via WebSocket
        channel_layer = get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            f'chat_{message.receiver_id}',
            {
                'type': 'chat_message',
                'message': message_data
            }
        )

        async_to_sync(channel_layer.group_send)(
            f'chat_{message.sender_id}',
            {
                'type': 'message_sent',
                'message': message_data
            }
        )

        # ✅ Create notification
        try:
            notification = Notification.objects.create(
                user=message.receiver,
                message=f"You received a message from {message.sender.email}",
                notification_type='message',
                related_id=str(message.id)
            )
            print("✅ Notification created:", notification.id)
            logger.info(f"Notification created: {notification.id}")

            # Send notification via WebSocket
            notification_data = {
                'id': notification.id,
                'message': notification.message,
                'is_read': False,
                'notification_type': notification.notification_type,
                'related_id': notification.related_id,
                'created_at': notification.created_at.isoformat()
            }

            async_to_sync(channel_layer.group_send)(
                f'notifications_{message.receiver_id}',
                {
                    'type': 'send_notification',
                    'notification': notification_data
                }
            )
        except Exception as e:
            logger.error(f"❌ Failed to create or send notification: {str(e)}")
            print("❌ Notification creation error:", str(e))

        logger.info(f"Message and notification sent: {message.id}")

     except Exception as e:
        logger.error(f"Error in perform_create: {str(e)}")
        raise


    def create(self, request, *args, **kwargs):
        """Override create to handle errors properly"""
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"Error creating message via API: {str(e)}")
            return Response(
                {'error': 'Failed to send message', 'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MessageByReceiverAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get messages between authenticated user and specific receiver",
        manual_parameters=[
            openapi.Parameter('receiver_id', openapi.IN_PATH, description="Receiver User ID", type=openapi.TYPE_STRING)
        ],
        responses={200: MessageSerializer(many=True)}
    )
    
    def get(self, request, receiver_id):
        try:
            # Get messages between current user and specified receiver
            messages = Message.objects.filter(
                sender=request.user, receiver=receiver_id
            ).union(
                Message.objects.filter(
                    sender=receiver_id, receiver=request.user
                )
            ).order_by("timestamp")
            
            # Manually serialize to ensure proper format
            serialized_messages = []
            for msg in messages:
                serialized_messages.append({
                    'id': str(msg.id),
                    'sender': str(msg.sender.id),
                    'receiver': str(msg.receiver.id),
                    'content': msg.content,
                    'timestamp': msg.timestamp.isoformat()
                })
            
            return Response(serialized_messages, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Error fetching messages: {str(e)}")
            return Response(
                {'error': 'Failed to fetch messages', 'detail': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


