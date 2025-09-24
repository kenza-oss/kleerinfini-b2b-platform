from django import forms
from django.contrib import admin
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin

from admin_panel.admin_mixins import EditToggleAdminMixin
from admin_panel.widgets import AdminImagePreviewWidget

from products.models import Product, Category


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ('id', 'name', 'category', 'views', 'created_at')
    list_filter = ('category',)
    search_fields = ('name', 'description')
    ordering = ('-created_at',)
    autocomplete_fields = ['category']
    readonly_fields = ('views',)  # Optionnel mais conseillé si les vues sont comptées automatiquement
    unfold_icon = "fa-solid fa-box"
    unfold_section = "Catalogue"

    fieldsets = (
        (None, {
            'fields': (
                'name',
                'category',
                'description',
                'desc_courte',
                'desc_longue',
                'views',
            )
        }),
        ("Détails supplémentaires", {
            'fields': (
                'cle_min',
                'prix_indicatif',
                'delai_production',
                'fiche_tech',
                'images',
                'video',
                'est_pret',
                'region_org',
                'langue_du_product',
            ),
            'classes': ('collapse',),
        }),
    )


class CategoryAdminForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = '__all__'
        widgets = {
            'image': AdminImagePreviewWidget(),
        }


@admin.register(Category)
class CategoryAdmin(EditToggleAdminMixin, ModelAdmin):
    form = CategoryAdminForm
    list_display = ('id', 'name', 'type', 'description', 'image_preview')
    search_fields = ('name', 'type', 'description')
    ordering = ('name',)
    unfold_icon = "fa-solid fa-layer-group"
    unfold_section = "Catalogue"
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="120" style="border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.15);" />')
        return "Pas d'image"
    image_preview.short_description = 'Aperçu'

    fieldsets = (
        ('Informations de base', {
            'fields': ('name', 'type', 'description', 'specific_fields'),
            'description': 'Informations générales de la catégorie'
        }),
        ('Image', {
            'fields': ('image', 'image_preview'),
            'description': 'Image de la catégorie (formats supportés : JPG, PNG)',
            'classes': ('wide',),
        }),
    )
