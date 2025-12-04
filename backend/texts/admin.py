from django.contrib import admin
from .models import TextExcerpt


@admin.register(TextExcerpt)
class TextExcerptAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'writing_type', 'style', 'source_work']
    list_filter = ['writing_type', 'style', 'author']
    search_fields = ['title', 'author', 'text', 'source_work']
