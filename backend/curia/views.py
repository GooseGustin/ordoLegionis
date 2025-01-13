from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Announcement, Curia
from .serializers import AnnouncementSerializer, CuriaSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    # permission_classes = [permissions.AllowAny]

class CuriaViewSet(viewsets.ModelViewSet):
    queryset = Curia.objects.all()
    serializer_class = CuriaSerializer