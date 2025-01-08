from rest_framework import serializers
from .models import Answer, Post, Question


class AnswerSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Answer
        fields = [
            'id', 'content', 'date', #'legionary', 
            'question', 'upvotes', 'downvotes', 
            'flags'
        ]

class PostSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Post
        fields = [
            'id', 'title', 'content', 
            #'image', 
            'date', #'legionary', 
            'upvotes', 'downvotes', 'flags'
        ]

class QuestionSerializer(serializers.ModelSerializer):
    # flags = QuestionFlag
    class Meta: 
        model = Question
        fields = [
            'id', 'content', #'legionary', 
            'date', 'flags'
        ]
