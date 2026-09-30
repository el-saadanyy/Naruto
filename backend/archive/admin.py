from django.contrib import admin
from .models import Shinobi


@admin.register(Shinobi)
class ShinobiAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'kanji', 'village', 'clan', 'rank', 'status')
    list_filter = ('village', 'rank', 'status', 'clan')
    search_fields = ('id', 'name', 'kanji', 'specialty', 'summary')
    ordering = ('id',)

    fieldsets = (
        ('Core Identity & Nomenclature', {
            'fields': ('id', 'name', 'kanji')
        }),
        ('Categorical Metadata & Filters', {
            'fields': (
                ('village', 'villageDisplay'),
                ('clan', 'clanDisplay'),
                ('rank', 'rankDisplay'),
                'status',
            )
        }),
        ('Portrait & Media', {
            'fields': ('image',)
        }),
        ('Combat Intelligence & Jutsu', {
            'fields': ('specialty', 'natures', 'classification', 'summary', 'techniques')
        }),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing existing object: protect canonical primary key ID
            return ('id',)
        return ()
