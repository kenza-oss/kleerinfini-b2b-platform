from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import timedelta

SUBSCRIPTION_STATUS = [
    ("free", "Free"),
    ("pending_validation", "Pending Validation"),
    ("active", "Active"),
    ("rejected", "Rejected"),
    ("expired", "Expired"),
]

class Subscription(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=SUBSCRIPTION_STATUS, default="free")
    
    proof_file = models.FileField(upload_to="proofs/", null=True, blank=True)
    is_online_payment = models.BooleanField(default=False)
    
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(default=timezone.now() + timedelta(days=30))  # default 30-day free trial

    chargily_payment_link_id = models.CharField(max_length=255, blank=True, null=True)
    chargily_checkout_id = models.CharField(max_length=255, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def is_active(self):
        return self.status == "active" and self.end_date >= timezone.now().date()

    def activate(self, days=365, is_online=False):
        self.status = "active"
        self.is_online_payment = is_online
        self.start_date = timezone.now().date()
        self.end_date = self.start_date + timedelta(days=days)
        self.save()

    def mark_expired_if_needed(self):
        if self.end_date < timezone.now().date():
            self.status = "expired"
            self.save()

    def __str__(self):
        return f"{self.user.email} - {self.status}"
