from rest_framework import serializers 
from .models import (
    Achievement, FunctionAttendance, MembershipDetail, Report
)
from works.serializers import WorkSummarySerializer

class AchievementSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Achievement
        fields = [
            'id', 'no_recruited', 'no_baptized', 'no_confirmed', 
            'no_first_communicants', 'no_married', 'no_vocations',
            'no_converted', 'others'
        ]


class ReportSerializer(serializers.ModelSerializer):
    achievements = AchievementSerializer()

    class Meta: 
        model = Report 
        fields = [
            'id', 'praesidium', 'submission_date', 'last_submission_date', 
            'report_number', 'report_period', 'last_curia_visit_date', 
            'last_curia_visitors', 'officers_curia_attendance', 
            'no_curia_meetings_held','no_praesidium_meetings_held',
            'officers_meeting_attendance', 'extension_plans', 
            'problems', 'remarks', 'no_meetings_expected', 
            'no_meetings_held', 'avg_attendance', 'poor_attendance_reason', 
            'membership_details', 'include_intermediate',
            'achievements', 'function_attendances', 'work_total_and_average', 
            'patricians_start', 'patricians_end', 
            'work_summaries', 'financial_summary', 'audited',  
            'previous_curia_attendance', 'previous_meeting_attendance', 
            'read_and_accepted', 'conclusion'
        ]
        read_only_fields = ['function_attendances', 'work_summaries', 'financial_summary']

        # In create method, pop financial_summary from validated_data

    def create(self, validated_data):
        print("In create method of report")
        # Extract nested data
        achievement_data = validated_data.pop('achievements')
        # Create achievements
        achievement = Achievement.objects.create(**achievement_data)

        # Create Report
        report = Report.objects.create(
            achievements=achievement, 
            **validated_data
        )
        return report
        
    def update(self, instance, validated_data):
        print("In update method of report")
        
        # Handle nested achievements update
        achievement_data = validated_data.pop('achievements', None)
        if achievement_data:
            AchievementSerializer().update(instance.achievements, achievement_data)

        return super().update(instance, validated_data)


class FunctionAttendanceSerializer(serializers.ModelSerializer):
    class Meta: 
        model = FunctionAttendance
        fields = [
            'id', 'name', 'date', 'current_year_attendance', 
            'previous_year_attendance', 
            'report'
        ]



class MembershipDetailsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = MembershipDetail
        fields = [
            'id', 'affiliated_praesidia', 
            'active_members', 'probationary_members', 
            'auxiliary_members', 'adjutorian_members',
            'praetorian_members'
        ]




class ReportPrepGetSerializer(serializers.Serializer):
    last_submission_date = serializers.DateField()
    report_number = serializers.IntegerField()
    officers_curia_attendance = serializers.DictField(
        child=serializers.FloatField()
    )
    officers_meeting_attendance = serializers.DictField(
        child=serializers.FloatField()
    )
    no_meetings_expected = serializers.IntegerField()
    no_meetings_held = serializers.IntegerField()
    no_curia_meetings_held = serializers.DictField(
        child=serializers.FloatField()
    )
    no_praesidium_meetings_held = serializers.DictField(
        child=serializers.FloatField()
    )
    avg_attendance = serializers.IntegerField()
    work_summaries = serializers.ListField()
    financial_summary = serializers.ListField()




# class ReportSerializer2(serializers.ModelSerializer):
#     achievements = AchievementSerializer()
#     function_attendances = FunctionAttendanceSerializer(many=True)
#     work_summaries = WorkSummarySerializer(many=True)
    
#     class Meta:
#         model = Report
#         fields = [
#             'id', 'praesidium', 'submission_date', 'last_submission_date', 
#             'report_number', 'report_period', 'last_curia_visit_date', 
#             'last_curia_visitors', 'officers_curia_attendance', 
#             'officers_meeting_attendance', 'extension_plans', 
#             'problems', 'remarks', 'no_meetings_expected', 
#             'no_meetings_held', 'avg_attendance', 'poor_attendance_reason', 
#             'membership_details', 'achievements', 
#             # 'function_attendances', # create after report
#             'work_summaries', # create after report
#             # 'financial_summary' if needed later
#         ]
    
#     def create(self, validated_data):
#         print("In report create method", validated_data)
#         # Extract nested data
#         achievement_data = validated_data.pop('achievements')
#         fxn_attendances_data = validated_data.pop('function_attendances')
#         work_summaries_data = validated_data.pop('work_summaries')
        
#         # Create achievements (assuming a single object)
#         achievements_serializer = AchievementSerializer(data=achievement_data)
#         achievements_serializer.is_valid(raise_exception=True)
#         achievements = achievements_serializer.save()
        
#         # Create function attendances (list of objects)
#         function_attendances = []
#         for fxn_data in fxn_attendances_data:
#             print("check 1", fxn_data)
#             fxn_serializer = FunctionAttendanceSerializer(data=fxn_data)
#             fxn_serializer.is_valid(raise_exception=True)
#             fxn_obj = fxn_serializer.save()
#             function_attendances.append(fxn_obj)
        
#         # Create work summaries (list of objects)
#         work_summaries = []
#         for ws_data in work_summaries_data:
#             ws_serializer = WorkSummarySerializer(data=ws_data)
#             ws_serializer.is_valid(raise_exception=True)
#             ws_obj = ws_serializer.save()
#             work_summaries.append(ws_obj)
        
#         # Create Report object with remaining validated_data
#         report = Report.objects.create(
#             achievements=achievements,
#             **validated_data
#         )
        
#         # Assuming function_attendances and work_summaries are ManyToMany fields
#         report.function_attendances.set(function_attendances)
#         report.work_summaries.set(work_summaries)
#         return report

#     def update(self, instance, validated_data):
#         print("in update", validated_data)
#         # Extract nested data
#         achievement_data = validated_data.pop('achievements', None)
#         fxn_attendances_data = validated_data.pop('function_attendances', [])
#         work_summaries_data = validated_data.pop('work_summaries', [])

#         # Update achievements (ForeignKey)
#         if achievement_data:
#             achievement_serializer = AchievementSerializer(instance.achievements, data=achievement_data, partial=True)
#             achievement_serializer.is_valid(raise_exception=True)
#             achievement_serializer.save()

#         # Update function attendances (ManyToMany)
#         existing_fxn_attendances = {fxn.id: fxn for fxn in instance.function_attendances.all()}
#         updated_fxn_attendances = []

#         for fxn_data in fxn_attendances_data:
#             fxn_id = fxn_data.get("id", None)
#             if fxn_id and fxn_id in existing_fxn_attendances:
#                 # Update existing function attendance
#                 fxn_serializer = FunctionAttendanceSerializer(existing_fxn_attendances[fxn_id], data=fxn_data, partial=True)
#                 fxn_serializer.is_valid(raise_exception=True)
#                 updated_fxn_attendances.append(fxn_serializer.save())
#             else:
#                 # Create new function attendance
#                 fxn_serializer = FunctionAttendanceSerializer(data=fxn_data)
#                 fxn_serializer.is_valid(raise_exception=True)
#                 updated_fxn_attendances.append(fxn_serializer.save())

#         # Update work summaries (ManyToMany)
#         existing_work_summaries = {ws.id: ws for ws in instance.work_summaries.all()}
#         updated_work_summaries = []

#         for ws_data in work_summaries_data:
#             ws_id = ws_data.get("id", None)
#             if ws_id and ws_id in existing_work_summaries:
#                 # Update existing work summary
#                 ws_serializer = WorkSummarySerializer(existing_work_summaries[ws_id], data=ws_data, partial=True)
#                 ws_serializer.is_valid(raise_exception=True)
#                 updated_work_summaries.append(ws_serializer.save())
#             else:
#                 # Create new work summary
#                 ws_serializer = WorkSummarySerializer(data=ws_data)
#                 ws_serializer.is_valid(raise_exception=True)
#                 updated_work_summaries.append(ws_serializer.save())

#         # Update report fields with remaining validated data
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)

#         instance.save()

#         # Set updated ManyToMany relationships
#         instance.function_attendances.set(updated_fxn_attendances)
#         instance.work_summaries.set(updated_work_summaries)

#         return instance

        