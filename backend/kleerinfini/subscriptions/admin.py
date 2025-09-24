# subscriptions/admin.py
from django.contrib import admin
from .models import Subscription

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['user', 'status', 'start_date', 'end_date', 'is_online_payment']
    list_filter = ['status', 'is_online_payment']
    readonly_fields = ['created_at']
