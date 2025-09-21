from django.db import models

# Create your models here.

class Memorial(models.Model):
    CARD_TYPES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('child', 'Child'),
    ]
    name = models.CharField(max_length=255)
    card_type = models.CharField(max_length=10, choices=CARD_TYPES)
    birth_date = models.DateField()
    death_date = models.DateField()
    memory_text = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to="photos/", blank=True, null=True)
    qr_code_data = models.ImageField(upload_to="qr/", blank=True, null=True)
    nfc_data = models.TextField(blank=True, null=True)
    gps_latitude = models.DecimalField(max_digits=10, decimal_places=8, blank=True, null=True)
    gps_longitude = models.DecimalField(max_digits=11, decimal_places=8, blank=True, null=True)
    gps_location_name = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    avatar = models.FileField(upload_to="avatars/", blank=True, null=True)

    def __str__(self):
        return self.name
