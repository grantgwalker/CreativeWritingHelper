from django.contrib import admin
from .models import WritingSession, WritingStreak


@admin.register(WritingSession)
class WritingSessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'writing_type', 'word_count', 'created_at']
    list_filter = ['writing_type', 'created_at']
    search_fields = ['user__username', 'writing_type', 'user_writing']
    readonly_fields = ['created_at', 'word_count']


@admin.register(WritingStreak)
class WritingStreakAdmin(admin.ModelAdmin):
    list_display = ['user', 'current_streak', 'longest_streak', 'total_sessions', 'last_writing_date']
    list_filter = ['last_writing_date']
    search_fields = ['user__username']
