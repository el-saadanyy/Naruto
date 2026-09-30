from django.contrib import admin
from .models import Favorite


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'item_type', 'item_id', 'item_title', 'created_at')
    list_filter = ('item_type', 'created_at')
    search_fields = ('user__username', 'item_id', 'item_title')
    ordering = ('-created_at',)
