from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=50, blank=True)
    specific_fields = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/', null=True, blank=True, verbose_name='Image de la catégorie')

    def __str__(self):
        return self.name

    # class Meta:
    #     verbose_name = "Catégorie"
    #     verbose_name_plural = "Catégories"


class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name='Nom')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')

    description = models.TextField(blank=True, verbose_name='Description')
    desc_courte = models.CharField(max_length=255, blank=True, verbose_name='Description courte')
    desc_longue = models.TextField(blank=True, verbose_name='Description longue')

    cle_min = models.CharField(max_length=100, blank=True, verbose_name='Clé minimum')
    prix_indicatif = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='Prix indicatif'
    )
    delai_production = models.CharField(max_length=100, blank=True, verbose_name='Délai de production')

    fiche_tech = models.FileField(upload_to='fiches_tech/', null=True, blank=True, verbose_name='Fiche technique')
    images = models.JSONField(default=list, blank=True, verbose_name='Images')
    video = models.FileField(upload_to='videos/', null=True, blank=True, verbose_name='Vidéo')

    est_pret = models.BooleanField(default=False, verbose_name='Est prêt')
    region_org = models.CharField(max_length=100, blank=True, verbose_name="Région d'origine")
    langue_du_product = models.CharField(max_length=50, blank=True, verbose_name='Langue du produit')

    views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Produit'
        verbose_name_plural = 'Produits'
