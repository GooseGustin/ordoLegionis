from .serializers import MeetingSerializer
from rest_framework import viewsets 
from rest_framework.response import Response
from .models import Meeting 
from praesidium.models import Praesidium

class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def list(self, request):
        print("In list method of FxnAttendanceView\n\n")
        praes_id = request.GET.get('pid') 
        if praes_id:
            praesidium = Praesidium.objects.get(id=praes_id)
            meetings = praesidium.meetings.all()
            serializer = self.get_serializer(meetings, many=True)
            return Response(serializer.data)
        return super().list(self, request)