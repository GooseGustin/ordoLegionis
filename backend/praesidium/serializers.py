from rest_framework import serializers 
from .models import Praesidium, Reminder
from accounts.models import Legionary 
from curia.serializers import getIden

class PraesidiumSerializer(serializers.ModelSerializer):
    # remove iden from serializer
    class Meta: 
        model = Praesidium 
        fields = [
            'id', 'name', 'state', 'country', 'parish', 'curia', 
            'iden', 'address', 'meeting_time', 'inaug_date', 
            'president', 'pres_app_date', 'vice_president', 
            'vp_app_date', 'secretary', 'sec_app_date', 
            'treasurer', 'tres_app_date', 'managers', 'members',
            'membership_requests', 'next_report_deadline', 
            'created_at'
        ]
        read_only_fields = [
            'id', 'iden', 'managers', 
            'members', 'membership_requests', 'created_at'
            ]

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            user = request.user 
            legionary = Legionary.objects.get(user=user)
            validated_data['managers'] = []
            validated_data['managers'].extend([legionary])
            validated_data['members'] = []
            validated_data['members'].extend([legionary])
            validated_data['iden'] = getIden(validated_data['name']) # iden remains the same even though the praesidium or curia name is changd
        return super().create(validated_data)

# praesidium serializer for staff 

class ReminderSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Reminder 
        fields = [
            'id', 'praesidium', 
            'content', 'deadline',
            'hidden_by', 'acknowledged_by'
        ]
        read_only_fields = ['hidden_by', 'acknowledged_by']

    