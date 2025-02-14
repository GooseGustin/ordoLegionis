# from django.shortcuts import render
from rest_framework import viewsets 
from rest_framework.response import Response
from .serializers import (
    WorkSerializer, 
    WorkListSerializer, 
    WorkTypeOptionSerializer
    # , WorkSummarySerializer
)
from .models import Work, WorkList, WorkTypeOption #, WorkSummary
from praesidium.models import Praesidium
from meetings.models import Meeting 

# Create your views here.
class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer

    def list(self, request): 
        print("In list method of WorkViewSet\n\n")
        meet_id = request.GET.get('mid') 
        if meet_id: # filter by meeting 
            meeting = Meeting.objects.get(id=meet_id)
            works = meeting.works
            serializer = self.get_serializer(works, many=True)
            return Response(serializer.data)
        work = Work.objects.all()
        serializer = self.get_serializer(work, many=True)
        return Response(serializer.data)
class WorkListViewSet(viewsets.ModelViewSet):
    queryset = WorkList.objects.all()
    serializer_class = WorkListSerializer 

    def list(self, request): 
        print("In list method of WorkListViewSet\n\n")
        praes_id = request.GET.get('pid') 
        if praes_id: # filter by praesidium 
            praesidium = Praesidium.objects.get(id=praes_id)
            work_list = praesidium.work_list
            serializer = self.get_serializer(work_list, many=False)
            return Response(serializer.data)
        work_list = WorkList.objects.all()
        serializer = self.get_serializer(work_list, many=True)
        return Response(serializer.data) 

class WorkTypeOptionViewSet(viewsets.ModelViewSet):
    queryset = WorkTypeOption.objects.all()
    serializer_class = WorkTypeOptionSerializer


# class WorkSummaryViewSet(viewsets.ModelViewSet):
#     queryset = WorkSummary.objects.all()
#     serializer_class = WorkSummarySerializer
