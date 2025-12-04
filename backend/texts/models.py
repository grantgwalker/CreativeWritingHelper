from django.db import models


class TextExcerpt(models.Model):
    """Model for classical text excerpts"""
    STYLE_CHOICES = [
        ('descriptive', 'Descriptive'),
        ('narrative', 'Narrative'),
        ('dialogue', 'Dialogue'),
        ('poetic', 'Poetic'),
        ('expository', 'Expository'),
    ]
    
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    text = models.TextField()
    writing_type = models.CharField(max_length=100)
    style = models.CharField(max_length=50, choices=STYLE_CHOICES)
    source_work = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['author', 'title']
        indexes = [
            models.Index(fields=['writing_type']),
            models.Index(fields=['style']),
        ]
    
    def __str__(self):
        return f"{self.author} - {self.title}"
