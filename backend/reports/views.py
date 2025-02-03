from rest_framework.response import Response
from rest_framework import viewsets, status 
from rest_framework.views import APIView
from .serializers import * 
from .models import (
    Report, FunctionAttendance, MembershipDetail, Achievement
)
from meetings.models import Meeting
from datetime import datetime, timezone 
from math import ceil

# Create your views here.
class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all() # filter by manager
    serializer_class = ReportSerializer

class FunctionAttendanceViewSet(viewsets.ModelViewSet):
    queryset = FunctionAttendance.objects.all()
    serializer_class = FunctionAttendanceSerializer

class MembershipDetailsViewSet(viewsets.ModelViewSet):
    queryset = MembershipDetail.objects.all()
    serializer_class = MembershipDetailsSerializer

class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializers

# /* Create an endpoint (prepareReport) that 
#     takes in the time period
#         - from (last submission date?) 
#         - to (submission date)
#     can provide 
#         - the last submission date, 
#         - the last report number
#             - at server-side, the 
#         - officers curia attendance (over the period)
#         - officers meeting attendance (over the period)
#         - number of meetings held (over the period)
#         - average attendance (over the period)
#         - legion functions attendance ?? 

#     */

class ReportPrepGetView(APIView):
    def get(self, request, *args, **kwargs):
        pid = request.GET.get('praesidiumId', 1)
        meeting_start = request.GET.get('startDate', '2022-1-1')
        meeting_end = request.GET.get('endDate', '2023-1-1')
        
        praesidium = Praesidium.objects.get(id=pid) 
        meeting_start = [int(i) for i in meeting_start.split('-')]
        meeting_end = [int(i) for i in meeting_end.split('-')]
        start_date = datetime(*meeting_start).replace(tzinfo=timezone.utc)
        end_date = datetime(*meeting_end).replace(tzinfo=timezone.utc)
        praesidium_meetings = Meeting.objects.filter(praesidium=praesidium)
        meetings_within_range = praesidium_meetings.filter(date__range=(start_date, end_date))

        no_of_meetings_expected = (end_date - start_date).days // 7 + 1
        no_of_meetings_held = len(meetings_within_range)
        average_attendance = 0
        officers_meeting_attendance = {
            'President': 0, 'Vice President':0, 'Secretary':0, 'Treasurer':0
        }
        officers_curia_attendance = officers_meeting_attendance.copy() 
        if meetings_within_range: 
            for meeting in meetings_within_range: 
                for officer in ['President', 'Vice President', 'Secretary', 'Treasurer']: 
                    if officer in meeting.officers_meeting_attendance: 
                        officers_meeting_attendance[officer] += 1
                    if officer in meeting.officers_curia_attendance:
                        officers_curia_attendance[officer] += 1
                average_attendance += meeting.no_present
        average_attendance = ceil(average_attendance / no_of_meetings_held)

        last_report = Report.objects.filter(praesidium=praesidium).last()
        # Perhaps the last report is the current report, the submission date
        # will be in the future not the past, so we take the last submision
        # date instead 
        last_submission_date = today = datetime.today().date()
        last_report_number = 1
        if last_report: 
            if last_report.submission_date < today:
                last_submission_date = last_report.submission_date 
            else: 
                last_submission_date = last_report.last_submission_date
            last_report_number = last_report.report_number

        processed_data = {
            'last_submission_date': last_submission_date, 
            'last_report_number': last_report_number, 
            'officers_curia_attendance': officers_curia_attendance, 
            'officers_meeting_attendance': officers_meeting_attendance, 
            'no_meetings_expected': no_of_meetings_expected, 
            'no_meetings_held': no_of_meetings_held, 
            'average_attendance': average_attendance, 
            # 'legion_functions_attendance': attendances_within_range

        }

        serializer = ReportPrepGetSerializer(processed_data)
        return Response(serializer.data, status=status.HTTP_200_OK)