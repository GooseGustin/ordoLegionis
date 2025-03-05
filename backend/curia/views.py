from django.shortcuts import render
from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from .models import Announcement, Curia
from .serializers import AnnouncementSerializer, CuriaSerializer

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    # permission_classes = [permissions.AllowAny]

    def list(self, request): 
        print("In list method of AnnouncementViewSet\n\n", request.GET)
        cid = request.GET.get('cid') 
        if cid: # filter by praesidium 
            # Ensure user has access to this praesidium
            announcements = self.queryset.filter(curia=cid)
            serializer = self.get_serializer(announcements, many=True)
            return Response(serializer.data)
        # work_list = WorkList.objects.all()
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data) 

class CuriaViewSet(viewsets.ModelViewSet):
    queryset = Curia.objects.all()
    serializer_class = CuriaSerializer
