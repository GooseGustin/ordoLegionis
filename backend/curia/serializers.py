from rest_framework import serializers
from .models import Announcement, Curia
from accounts.models import Legionary 
from random import randint, shuffle

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Announcement
        fields = [
            'id', 'curia', 'date', 
            'deadline', 'title', 
            'content', 'image', 
            'hidden_by', 'acknowledged_by'
        ]
        read_only_fields = ['date', 'hidden_by', 'acknowledged_by']

    def create(self, validated_data):
        validated_data['hidden_by'] = []
        validated_data['acknowledged_by'] = []
        return super().create(validated_data)

def getIden(name):
    letters = [i[0] for i in name.split(' ')]
    pepper = [str(randint(0,50)) for _ in range(3)]
    letters.extend(pepper) 
    shuffle(letters)
    letters = ''.join(letters)
    return letters

class CuriaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Curia
        fields = [
            'id', 'name', 'iden', 'inaug_date',
            'state', 'country', 
            'parish', 'spiritual_director', 'spiritual_director_app_date',
            'creator', 'created_at',
            'managers', 'management_requests'
        ]
        read_only_fields = ['creator', 'created_at', 'iden', 'managers', 'management_requests']  

    def create(self, validated_data):
        request = self.context.get('request')
        print("In curia serializer create method", request.user)
        if request and hasattr(request, 'user'):
            user = request.user 
            legionary = Legionary.objects.get(user=user)
            validated_data['creator'] = legionary 
            validated_data['managers'] = []
            validated_data['managers'].extend([legionary])
            validated_data['iden'] = getIden(validated_data['name'])
        return super().create(validated_data)
