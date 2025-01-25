# from django.shortcuts import render
from rest_framework import viewsets 
from .serializers import (
    WorkSerializer, 
    WorkListSerializer, 
    WorkTypeOptionSerializer
    # , WorkSummarySerializer
)
from .models import Work, WorkList, WorkTypeOption #, WorkSummary

# Create your views here.
class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer

# class WorkSummaryViewSet(viewsets.ModelViewSet):
#     queryset = WorkSummary.objects.all()
#     serializer_class = WorkSummarySerializer

class WorkListViewSet(viewsets.ModelViewSet):
    queryset = WorkList.objects.all()
    serializer_class = WorkListSerializer 

class WorkTypeOptionViewSet(viewsets.ModelViewSet):
    queryset = WorkTypeOption.objects.all()
    serializer_class = WorkTypeOptionSerializer