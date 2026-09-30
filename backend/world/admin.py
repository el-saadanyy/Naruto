from django.contrib import admin
from .models import Village


@admin.register(Village)
class VillageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'seal_text', 'era_tag', 'display_order')
    search_fields = ('id', 'title', 'seal_text', 'era_tag', 'summary')
    ordering = ('display_order', 'id')
