from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WritingSessionViewSet, WritingStreakViewSet, TextExcerptViewSet

router = DefaultRouter()
router.register(r'excerpts', TextExcerptViewSet, basename='excerpt')
router.register(r'sessions', WritingSessionViewSet, basename='session')
router.register(r'streaks', WritingStreakViewSet, basename='streak')

urlpatterns = [
    path('', include(router.urls)),
]
