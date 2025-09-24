from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import timedelta
from users.models import User
from subscriptions.models import Subscription

@receiver(post_save, sender=User)
def create_free_subscription(sender, instance, created, **kwargs):
    if created and instance.role == 'producer':
        Subscription.objects.create(
            user=instance,
            status='free',
            start_date=timezone.now(),
            end_date=timezone.now() + timedelta(days=30)
        )
