from .serializers import MeetingSerializer
from rest_framework import viewsets 
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Meeting 
from praesidium.models import Praesidium
from datetime import date, timezone 

class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    paginate_by = 5

    def list(self, request):
        print("In list method of FxnAttendanceView\n\n")
        praes_id = request.GET.get('pid') 
        if praes_id:
            praesidium = Praesidium.objects.get(id=praes_id)
            meetings = praesidium.meetings.all()
            serializer = self.get_serializer(meetings, many=True)
            return Response(serializer.data)
        return super().list(self, request)


class MeetingFilterView(APIView):
    def post(self, request, *args, **kwargs):
        # print(dir(request))
        # print(request.data, request.query_params)
        pid = request.data.get('pid', 1)
        # print("In meeting filter, pid", pid)
        praesidium = Praesidium.objects.get(id=pid) 
        meeting_start = request.data.get('startDate', '2025-1-1')
        print("In meeting filter, startDate", meeting_start)
        meeting_end = request.data.get('endDate')
        serializer_class = MeetingSerializer

        if (meeting_start and not meeting_end): 
            # Find particular date's meeting
            loc = "In filter meeting"
            start_date_undashed = meeting_start.split('-')
            start_date_nums = [int(i) for i in start_date_undashed]
            start_date = date(*start_date_nums) # .replace(tzinfo=timezone.utc)
            praesidium_meetings = Meeting.objects.filter(praesidium=praesidium)
            print(loc, 'praesidium meetings', praesidium_meetings)
            print('\n', [meeting.date for meeting in praesidium_meetings], start_date)
            meeting_for_date = praesidium_meetings.filter(date=start_date)
            print(loc, 'filtered meeting', meeting_for_date)
            serializer = serializer_class(meeting_for_date, many=True)
            return Response(serializer.data)
        
        elif (meeting_start and meeting_end): 
            # Get meeting range 
            meeting_start = [int(i) for i in meeting_start.split('-')]
            meeting_end = [int(i) for i in meeting_end.split('-')]
            start_date = date(*meeting_start).replace(tzinfo=timezone.utc)
            end_date = date(*meeting_end) # .replace(tzinfo=timezone.utc)
            praesidium_meetings = Meeting.objects.filter(praesidium=praesidium)
            meetings_within_range = praesidium_meetings.filter(date__range=(start_date, end_date))
            serializer = serializer_class(meetings_within_range, many=True)
            return Response(serializer.data)

