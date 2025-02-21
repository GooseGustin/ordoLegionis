from rest_framework import serializers 
from .models import * 

class ReportSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Report 
        fields = [
            'id', 'praesidium', 'submission_date', 'last_submission_date', 
            'report_number', 'report_period', 'last_curia_visit_date', 
            'last_curia_visitors', 'officers_curia_attendance', 
            'officers_meeting_attendance', 'extension_plans', 
            'problems', 'remarks', 'no_meetings_expected', 
            'no_meetings_held', 'avg_attendance', 'poor_attendance_reason', 
            'membership_details', 'achievements', 'function_attendances'
            #, 'work_summary', 'financial_summary'
        ]

class FunctionAttendanceSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FunctionAttendance
        fields = [
            'id', 'name', 'date', 'current_year_attendance', 
            'previous_year_attendance', 'report'
        ]

class MembershipDetailsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = MembershipDetail
        fields = [
            'id', 'senior_praesidia', 'junior_praesidia', 
            'active_members', 'probationary_members', 
            'auxiliary_members', 'adjutorian_members',
            'praetorian_members'
        ]

class AchievementSerializers(serializers.ModelSerializer):
    class Meta: 
        model = Achievement
        fields = [
            'id', 'no_recruited', 'no_baptized', 'no_confirmed', 
            'no_first_communicants', 'others'
        ]


class ReportPrepGetSerializer(serializers.Serializer):
    last_submission_date = serializers.DateField()
    last_report_number = serializers.IntegerField()
    officers_curia_attendance = serializers.DictField(
        child=serializers.FloatField()
    )
    officers_meeting_attendance = serializers.DictField(
        child=serializers.FloatField()
    )
    no_meetings_expected = serializers.IntegerField()
    no_meetings_held = serializers.IntegerField()
    average_attendance = serializers.IntegerField()
    # legion_functions_attendance = serializers.ListField()