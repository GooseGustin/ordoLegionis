from rest_framework import serializers
from .models import * 

class ExpensesSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Expenses
        fields = [
            'id', 'extension', 'remittance', 
            'stationery', 'altar', 
            'bouquet', 'others'
        ]

    # def create(self, validated_data):
    #     print('In Expenses serializer', validated_data)
    #     expenses = Expenses.objects.create(**validated_data)
    #     return expenses

class AcctStatementSerializer(serializers.ModelSerializer):
    expenses = ExpensesSerializer()
    class Meta: 
        model = AcctStatement
        fields = [
            'id', 'acf', 'sbc', 'balance', 'expenses'
        ]

class AcctAnnouncementSerializer(serializers.ModelSerializer):
    class Meta: 
        model = AcctAnnouncement
        fields = [
            'id', 'sbc', 'collection_1', 'collection_2'
        ]

class FinancialRecordSerializer(serializers.ModelSerializer):
    acct_statement = AcctStatementSerializer()
    acct_announcement = AcctAnnouncementSerializer()
    class Meta: 
        model = FinancialRecord
        fields = [
            'id', 'meeting', 'acct_statement', 'acct_announcement'
        ]

    def create(self, validated_data):
        print('In FinancialRecord serializer', validated_data)
        
        acctStatementData = validated_data['acct_statement']
        expensesData = acctStatementData['expenses'] 
        expenses = Expenses.objects.create(**expensesData) 
        acctStatementData['expenses'] = expenses 
        acctStatement = AcctStatement.objects.create(**acctStatementData)
        
        acctAnnouncementData = validated_data['acct_announcement']
        acctAnnouncement = AcctAnnouncement.objects.create(**acctAnnouncementData)

        validated_data['acct_statement'] = acctStatement
        validated_data['acct_announcement'] = acctAnnouncement

        financialRecord = FinancialRecord.objects.create(**validated_data)
        return financialRecord

    def update(self, validated_data):
        print('In FinancialRecord serializer', validated_data)
        
        acctStatementData = validated_data['acct_statement']
        expensesData = acctStatementData['expenses'] 
        expenses = Expenses.objects.create(**expensesData) 
        acctStatementData['expenses'] = expenses 
        acctStatement = AcctStatement.objects.create(**acctStatementData)
        
        acctAnnouncementData = validated_data['acct_announcement']
        acctAnnouncement = AcctAnnouncement.objects.create(**acctAnnouncementData)

        validated_data['acct_statement'] = acctStatement
        validated_data['acct_announcement'] = acctAnnouncement
        
        financialRecord = FinancialRecord.objects.create(**validated_data)
        return financialRecord


class FinancialSummarySerializer(serializers.ModelSerializer):
    class Meta: 
        model = FinancialSummary
        fields = [
            'id', 'report', 
            'abf', 'sbc', 'expenses', 
            'report_production'
        ]

