from rest_framework import serializers
from django.contrib.auth.models import User
from .models import WritingSession, WritingStreak
from texts.models import TextExcerpt


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class TextExcerptSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextExcerpt
        fields = ['id', 'title', 'author', 'text', 'writing_type', 'style', 'source_work']


class WritingSessionSerializer(serializers.ModelSerializer):
    excerpt = TextExcerptSerializer(read_only=True)
    excerpt_id = serializers.PrimaryKeyRelatedField(
        queryset=TextExcerpt.objects.all(),
        source='excerpt',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = WritingSession
        fields = ['id', 'user', 'writing_type', 'excerpt', 'excerpt_id', 
                  'user_writing', 'created_at', 'word_count']
        read_only_fields = ['user', 'created_at', 'word_count']
    
    def create(self, validated_data):
        # Calculate word count
        user_writing = validated_data.get('user_writing', '')
        validated_data['word_count'] = len(user_writing.split())
        return super().create(validated_data)


class WritingStreakSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = WritingStreak
        fields = ['id', 'username', 'current_streak', 'longest_streak', 
                  'last_writing_date', 'total_sessions']
        read_only_fields = ['current_streak', 'longest_streak', 'last_writing_date', 'total_sessions']
