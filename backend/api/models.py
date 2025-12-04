from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class WritingSession(models.Model):
    """Model to track user writing sessions"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='writing_sessions')
    writing_type = models.CharField(max_length=100)
    excerpt = models.ForeignKey('texts.TextExcerpt', on_delete=models.SET_NULL, null=True, blank=True)
    user_writing = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    word_count = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.writing_type} - {self.created_at.date()}"


class WritingStreak(models.Model):
    """Model to track user writing streaks"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='writing_streak')
    current_streak = models.IntegerField(default=0)
    longest_streak = models.IntegerField(default=0)
    last_writing_date = models.DateField(null=True, blank=True)
    total_sessions = models.IntegerField(default=0)
    
    def update_streak(self):
        """Update streak based on new writing session"""
        today = timezone.now().date()
        
        if self.last_writing_date is None:
            # First writing session
            self.current_streak = 1
            self.longest_streak = 1
        elif self.last_writing_date == today:
            # Already wrote today, don't increment
            pass
        elif (today - self.last_writing_date).days == 1:
            # Consecutive day
            self.current_streak += 1
            if self.current_streak > self.longest_streak:
                self.longest_streak = self.current_streak
        else:
            # Streak broken
            self.current_streak = 1
        
        self.last_writing_date = today
        self.total_sessions += 1
        self.save()
    
    def __str__(self):
        return f"{self.user.username} - Streak: {self.current_streak}"
