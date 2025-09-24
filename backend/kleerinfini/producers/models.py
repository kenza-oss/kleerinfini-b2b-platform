from django.db import models
from users.models import User


class Certification(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    issued_by = models.CharField(max_length=255, blank=True)
    valid_until = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='certifications/', null=True, blank=True, verbose_name='Image du certificat')
    is_editable = models.BooleanField(default=False, verbose_name='Modification activée')

    def __str__(self):
        return self.name


class ProducerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='producer_profile')
    company_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=255, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name='Latitude')
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True, verbose_name='Longitude')
    stats = models.JSONField(default=dict, blank=True, verbose_name='Statistiques')
    certifications = models.ManyToManyField(Certification, blank=True, related_name='producers', verbose_name='Certifications')
    documents = models.FileField(upload_to='producer_docs/', null=True, blank=True, verbose_name='Documents')
    is_editable = models.BooleanField(default=False, verbose_name='Modification activée')

    def __str__(self):
        return f"Profil de {self.user.email}"
