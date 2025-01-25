# from django.shortcuts import render
from rest_framework import viewsets 
from .serializers import * 

# Create your views here.
class FinancialRecordViewSet(viewsets.ModelViewSet):
    queryset = FinancialRecord.objects.all()
    serializer_class = FinancialRecordSerializer

class FinancialSummaryViewSet(viewsets.ModelViewSet):
    queryset = FinancialSummary.objects.all()
    serializer_class = FinancialSummarySerializer

class AcctStatementViewSet(viewsets.ModelViewSet):
    queryset = AcctStatement.objects.all()
    serializer_class = AcctStatementSerializer

class AcctAnnouncementViewSet(viewsets.ModelViewSet): 
    queryset = AcctAnnouncement.objects.all() 
    serializer_class = AcctAnnouncementSerializer

class ExpensesViewSet(viewsets.ModelViewSet): 
    queryset = Expenses.objects.all()
    serializer_class = ExpensesSerializer