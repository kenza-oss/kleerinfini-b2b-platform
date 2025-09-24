# subscriptions/urls.py
from django.urls import path
from .views import UploadPaymentProofView,ChargilyPaymentLinkView,chargily_webhook

urlpatterns = [
    path("upload-proof/", UploadPaymentProofView.as_view(), name="upload-proof"),
    path("chargily-payment/", ChargilyPaymentLinkView.as_view(), name="chargily-payment"), 
    path("chargily/webhook/", chargily_webhook, name="chargily_webhook"),
]
