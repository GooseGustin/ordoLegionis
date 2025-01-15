# from django.shortcuts import render
from rest_framework import viewsets 
from .models import Praesidium, Reminder
from .serializers import PraesidiumSerializer, ReminderSerializer

# Create your views here.
class PraesidiumViewSet(viewsets.ModelViewSet):
    queryset = Praesidium.objects.all()
    serializer_class = PraesidiumSerializer
    # permission_classes = [permissions.IsAuthenticated]

class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer