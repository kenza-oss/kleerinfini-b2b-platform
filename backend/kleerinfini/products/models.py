from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=50, blank=True)
    specific_fields = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    description = models.TextField(blank=True)
    views = models.IntegerField(default=0)
    # Ajoute ici d'autres champs spécifiques selon la catégorie si besoin
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name