from django.shortcuts import render
from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from .models import Announcement, Curia
from .serializers import AnnouncementSerializer, CuriaSerializer
from accounts.models import Legionary 
from api.function_vault import removeDuplicates

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

    def list(self, request): 
        print("In list method of CuriaViewSet\n\n", request.GET)
        uid = request.GET.get('uid')
        if uid: # filter by user membership
            # Ensure user has permission
            legionary = Legionary.objects.get(user=request.user)
            print(legionary, legionary.associated_praesidia)  # type: ignore
            curiae = [praesidium.curia for praesidium in legionary.associated_praesidia.iterator()]  # type: ignore
            curiae = removeDuplicates(curiae)
            curiae.extend([curia for curia in legionary.curiae_created.iterator()]) # type: ignore
            # print('Curia', curiae)
            serializer = self.get_serializer(curiae, many=True) 
            return Response(serializer.data) 

        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data) 