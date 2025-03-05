from django.db import models
from praesidium.models import Praesidium

# Create your models here.

class MembershipDetail(models.Model):
    senior_praesidia = models.IntegerField(default=0)
    junior_praesidia = models.IntegerField(default=0)
    active_members = models.IntegerField(default=0)
    probationary_members = models.IntegerField(default=0)
    auxiliary_members = models.IntegerField(default=0)
    adjutorian_members = models.IntegerField(default=0)
    praetorian_members = models.IntegerField(default=0)

class Achievement(models.Model):
    no_recruited = models.IntegerField(default=0)
    no_baptized = models.IntegerField(default=0)
    no_confirmed = models.IntegerField(default=0)
    no_first_communicants = models.IntegerField(default=0)
    no_married = models.IntegerField(default=0)
    no_vocations = models.IntegerField(default=0)
    no_converted = models.IntegerField(default=0)
    others = models.JSONField(default=dict, null=True, blank=True)

class Report(models.Model):
    # A manager can create a report for whatever time range they specify for that praesidium
    praesidium = models.ForeignKey(Praesidium, on_delete=models.CASCADE, related_name='reports')
    submission_date = models.DateField(null=True, blank=True)
    last_submission_date = models.DateField(null=True, blank=True)
    report_number = models.IntegerField(default=0)
    report_period = models.IntegerField(default=0) # days
    last_curia_visit_date = models.DateField(null=True, blank=True)
    last_curia_visitors = models.TextField(null=True, blank=True)
    officers_curia_attendance = models.JSONField(default=dict)
    officers_meeting_attendance = models.JSONField(default=dict)
    extension_plans = models.TextField(null=True, blank=True)
    problems = models.TextField(null=True, blank=True)
    remarks = models.TextField(null=True, blank=True)
    no_meetings_expected = models.IntegerField(default=0)
    no_meetings_held = models.IntegerField(default=0)
    avg_attendance = models.IntegerField(default=0)
    poor_attendance_reason = models.TextField(null=True, blank=True)
    membership_details = models.OneToOneField(MembershipDetail, on_delete=models.CASCADE)
    achievements = models.OneToOneField(Achievement, on_delete=models.CASCADE)

    def __str__(self):
        return "Report " + str(self.report_number) + " of " + self.praesidium.name

class FunctionAttendance(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField(null=True, blank=True)
    current_year_attendance = models.IntegerField(default=0)
    previous_year_attendance = models.IntegerField(default=0)
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name="function_attendances")

    def __str__(self): 
        string = self.name + " for report " + str(self.report.report_number) + " of " + self.report.praesidium.name
        return string 