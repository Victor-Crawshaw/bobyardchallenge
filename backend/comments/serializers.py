# comments/serializers.py
from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author', 'text', 'date', 'likes', 'image']
        read_only_fields = ['id', 'date']
        extra_kwargs = {
            'image': {'required': False, 'allow_null': True, 'allow_blank': True}
        }