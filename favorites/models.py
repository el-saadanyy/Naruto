from django.db import models
from django.contrib.auth.models import User


class Favorite(models.Model):
    ITEM_TYPE_CHOICES = [
        ('shinobi', 'Shinobi'),
        ('clan', 'Clan'),
        ('village', 'Village'),
        ('bijuu', 'Bijuu'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites')
    item_type = models.CharField(max_length=32, choices=ITEM_TYPE_CHOICES, default='shinobi')
    item_id = models.CharField(max_length=64)
    item_title = models.CharField(max_length=128, blank=True, default='')
    item_image = models.CharField(max_length=255, blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'item_type', 'item_id')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.item_type}:{self.item_id}"
