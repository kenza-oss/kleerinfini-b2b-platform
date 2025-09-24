from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'type', 'specific_fields', 'image', 'image_url']

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category'
    )

    def validate_fiche_tech(self, value):
        if value and not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError("Le fichier doit être au format PDF.")
        return value

    def validate_images(self, value):
        for img_url in value:
            if not (img_url.lower().endswith('.jpg') or img_url.lower().endswith('.jpeg') or img_url.lower().endswith('.png')):
                raise serializers.ValidationError("Les images doivent être au format JPG ou PNG.")
        return value

    class Meta:
        model = Product
        fields = '__all__'
