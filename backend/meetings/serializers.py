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

