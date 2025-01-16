from rest_framework import serializers
from .models import Meeting


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Meeting
        fields = [
            'date', 
            'praesidium', 
            'meeting_no',
            'no_present', 
            'officers_meeting_attendance',
            'officers_curia_attendance'
        ]

