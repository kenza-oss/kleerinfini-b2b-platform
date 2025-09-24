from unfold.admin import ModelAdmin
from django.contrib import admin
from django.utils.safestring import mark_safe
from django import forms

from admin_panel.admin_mixins import EditToggleAdminMixin
from admin_panel.widgets import AdminImagePreviewWidget

from .models import ProducerProfile, Certification

@admin.register(ProducerProfile)
class ProducerProfileAdmin(EditToggleAdminMixin, ModelAdmin):
    list_display = ('id', 'user', 'company_name', 'phone', 'address', 'latitude', 'longitude')
    search_fields = ('user__email', 'company_name', 'phone')
    ordering = ('company_name',)
    unfold_icon = "fa-solid fa-user-tie"
    unfold_section = "Utilisateurs"
    fieldsets = (
        (None, {
            'fields': ('user', 'company_name', 'phone', 'address'),
            'description': 'Informations de base du producteur'
        }),
        ('Localisation', {
            'fields': ('latitude', 'longitude'),
            'description': 'Coordonnées géographiques du producteur'
        }),
        ('Informations supplémentaires', {
            'fields': ('certifications', 'documents', 'stats'),
            'description': 'Documents et certifications'
        }),
    )


class CertificationAdminForm(forms.ModelForm):
    class Meta:
        model = Certification
        fields = '__all__'
        widgets = {
            'image': AdminImagePreviewWidget(),
        }

@admin.register(Certification)
class CertificationAdmin(EditToggleAdminMixin, ModelAdmin):
    form = CertificationAdminForm
    list_display = ('id', 'name', 'issued_by', 'valid_until', 'image_preview')
    list_filter = ('valid_until',)
    search_fields = ('name', 'issued_by')
    unfold_icon = "fa-solid fa-certificate"
    unfold_section = "Certifications"
    
    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="100" style="border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);" />')
        return "Pas d'image"
    image_preview.short_description = 'Aperçu'
    readonly_fields = ('image_preview',)

    fieldsets = (
        ('Informations principales', {
            'fields': ('name', 'description', 'issued_by', 'valid_until'),
        }),
        ('Image', {
            'fields': ('image', 'image_preview'),
            'description': 'Image de la certification (formats supportés : JPG, PNG)',
            'classes': ('wide',),
        }),
    )
