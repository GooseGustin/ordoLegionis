from django.db import models
from meetings.models import Meeting
from reports.models import Report

# Create your models here.
class Expenses(models.Model):
    extension = models.FloatField(default=0)
    remittance = models.FloatField(default=0)
    stationery = models.FloatField(default=0)
    altar = models.FloatField(default=0)
    bouquet = models.FloatField(default=0)
    others = models.JSONField(default=dict, null=True, blank=True)

    class Meta: 
        verbose_name_plural = 'expenses'

class AcctStatement(models.Model):
    acf = models.FloatField(default=0)
    sbc = models.FloatField(default=0)
    balance = models.FloatField(default=0)
    expenses = models.OneToOneField(Expenses, on_delete=models.CASCADE)

class AcctAnnouncement(models.Model):
    sbc = models.FloatField(default=0)
    collection_1 = models.FloatField(null=True, blank=True)
    collection_2 = models.FloatField(null=True, blank=True)

class FinancialRecord(models.Model):
    meeting = models.OneToOneField(Meeting, on_delete=models.CASCADE, related_name='records')
    acct_statement = models.OneToOneField(AcctStatement, on_delete=models.CASCADE)
    acct_announcement = models.OneToOneField(AcctAnnouncement, on_delete=models.CASCADE)
    
class FinancialSummary(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='financial_summaries')
    acf = models.JSONField(default=dict, null=True, blank=True) # from beginning year
    sbc = models.JSONField(default=dict, null=True, blank=True)
    expenses = models.JSONField(default=dict, null=True, blank=True)
    balance = models.JSONField(default=dict, null=True, blank=True)
    report_production = models.FloatField(default=0)

    class Meta: 
        verbose_name_plural = 'financial summaries'
