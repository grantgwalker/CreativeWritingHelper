from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Q
from .models import WritingSession, WritingStreak
from texts.models import TextExcerpt
from .serializers import (
    UserSerializer, WritingSessionSerializer, 
    WritingStreakSerializer, TextExcerptSerializer
)


class TextExcerptViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for browsing text excerpts"""
    queryset = TextExcerpt.objects.all()
    serializer_class = TextExcerptSerializer
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search for text excerpts by writing type"""
        writing_type = request.query_params.get('writing_type', '')
        
        if not writing_type:
            return Response(
                {'error': 'writing_type parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Search for excerpts matching the writing type
        excerpts = TextExcerpt.objects.filter(
            Q(writing_type__icontains=writing_type) |
            Q(style__icontains=writing_type)
        )
        
        # Get 5 different styles
        result = []
        styles_seen = set()
        
        for excerpt in excerpts:
            if excerpt.style not in styles_seen:
                result.append(excerpt)
                styles_seen.add(excerpt.style)
            if len(result) >= 5:
                break
        
        # If we don't have 5 different styles, add more excerpts
        if len(result) < 5:
            for excerpt in excerpts:
                if excerpt not in result:
                    result.append(excerpt)
                if len(result) >= 5:
                    break
        
        serializer = self.get_serializer(result, many=True)
        return Response(serializer.data)


class WritingSessionViewSet(viewsets.ModelViewSet):
    """ViewSet for managing writing sessions"""
    queryset = WritingSession.objects.all()
    serializer_class = WritingSessionSerializer
    
    def get_queryset(self):
        """Filter sessions by user"""
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return self.queryset.filter(user_id=user_id)
        return self.queryset
    
    def perform_create(self, serializer):
        """Create a writing session and update streak"""
        # Get or create user (for now, using a default user)
        user, created = User.objects.get_or_create(
            username='default_user',
            defaults={'email': 'user@example.com'}
        )
        
        session = serializer.save(user=user)
        
        # Update writing streak
        streak, created = WritingStreak.objects.get_or_create(user=user)
        streak.update_streak()
        
        return session


class WritingStreakViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing writing streaks"""
    queryset = WritingStreak.objects.all()
    serializer_class = WritingStreakSerializer
    
    @action(detail=False, methods=['get'])
    def current_user(self, request):
        """Get streak for current user"""
        user, created = User.objects.get_or_create(
            username='default_user',
            defaults={'email': 'user@example.com'}
        )
        
        streak, created = WritingStreak.objects.get_or_create(user=user)
        serializer = self.get_serializer(streak)
        return Response(serializer.data)
