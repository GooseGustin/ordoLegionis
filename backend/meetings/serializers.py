from rest_framework import serializers
from .models import Meeting


class MeetingSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Meeting
        fields = [
            'id', 
            'date', 
            'praesidium', 
            'meeting_no',
            'no_present', 
            'officers_meeting_attendance',
            'officers_curia_attendance'
        ]



# class MeetingFilterSerializer(serializers.Serializer):
#     meeting = MeetingSerializer()

    # startDate = serializers.DateField()
    # endDate = serializers.DateField()

    # last_report_number = serializers.IntegerField()
    # officers_curia_attendance = serializers.DictField(
    #     child=serializers.FloatField()
    # )
    # officers_meeting_attendance = serializers.DictField(
    #     child=serializers.FloatField()
    # )
    # no_meetings_expected = serializers.IntegerField()
    # no_meetings_held = serializers.IntegerField()
    # average_attendance = serializers.IntegerField()