from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from rest_framework import status, generics, mixins
from rest_framework.decorators import action 
from .models import Answer, Post, Question, PrayerRequest
from .serializers import (
    AnswerSerializer, PostSerializer, QuestionSerializer, PrayerRequestSerializer
)
from accounts.models import Legionary

class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    # permission_classes = [permissions.AllowAny]

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class PrayerRequestViewSet(ModelViewSet):
    queryset = PrayerRequest.objects.all()
    serializer_class = PrayerRequestSerializer

# class QuestionViewSet2(GenericViewSet):
#     serializer_class = QuestionSerializer
#     permission_classes = [IsAuthenticated,] 

#     def get_queryset(self):
#         return Question.objects.all()

#     @action(methods=['get'], detail=False)
#     def list(self, request): 
#         serializer = self.get_serializer_class()

# class QuestionMixinView(
#     mixins.RetrieveModelMixin, 
#     mixins.ListModelMixin, 
#     generics.GenericAPIView
#     ):
#     queryset = Question.objects.all()
#     serializer_class = QuestionSerializer

#     def get(self, request, *args, **kwargs):
#         pk = kwargs.get('pk', None)
#         if pk: 
#             return self.retrieve(request, *args, **kwargs)
#         return self.list(request, *args, **kwargs)
    
# question_mixin_view = QuestionMixinView.as_view()
    

# class QuestionCreateView(APIView):
#     permission_classes = [AllowAny,]

#     def post(self, request, *args, **kwargs):
#         serializer = QuestionSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class QuestionListView(APIView):
#     permission_classes = [IsAuthenticated,]
#     # queryset = Question.objects.all()

#     def get(self, request, format=None):
#         # usernames = [user.username for user in User.objects.all()]
#         user = request.user 
#         legionary = Legionary.objects.get(user=user)
#         questions = [question for question in legionary.question_set]

#         return Response(questions)