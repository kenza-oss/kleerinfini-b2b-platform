from rest_framework import serializers
from .models import Certification, ProducerProfile
from users.models import User

class CertificationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = ['id', 'name', 'description', 'issued_by', 'valid_until', 'image', 'image_url']

    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

class ProducerProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    
    class Meta:
        model = ProducerProfile
        fields = [
            'id', 'user', 'user_email', 'user_id', 'company_name', 
            'phone', 'address', 'latitude', 'longitude', 'stats', 
            'certifications', 'documents'
        ]
        read_only_fields = ['id', 'user_email', 'user_id']

class ProducerProfileCreateSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(write_only=True)
    
    class Meta:
        model = ProducerProfile
        fields = [
            'user_email', 'company_name', 'phone', 'address', 
            'stats', 'certifications', 'documents'
        ]
    
    def create(self, validated_data):
        user_email = validated_data.pop('user_email')
        try:
            user = User.objects.get(email=user_email)
            validated_data['user'] = user
            return super().create(validated_data)
        except User.DoesNotExist:
            raise serializers.ValidationError(f"Utilisateur avec l'email {user_email} n'existe pas")