from .serializers import MeetingSerializer
from rest_framework import viewsets 
from .models import Meeting 

class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

