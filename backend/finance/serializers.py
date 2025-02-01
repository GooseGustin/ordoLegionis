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
    #     print("In expenses serializer", validated_data)
    #     return Expenses.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     for field, value in validated_data.items():
    #         setattr(instance, field, value)
    #     instance.save()
    #     return instance

class AcctStatementSerializer(serializers.ModelSerializer):
    expenses = ExpensesSerializer()

    class Meta: 
        model = AcctStatement
        fields = ['id', 'acf', 'sbc', 'balance', 'expenses']

    def create(self, validated_data): 
        # Extract expenses data
        expenses_data = validated_data.pop('expenses')
        
        # Create new Expenses object
        expenses = Expenses.objects.create(**expenses_data)
        
        # Create AcctStatement with the created Expenses
        acct_statement = AcctStatement.objects.create(expenses=expenses, **validated_data)
        return acct_statement

    def update(self, instance, validated_data):
        # Handle expenses update
        expenses_data = validated_data.pop('expenses', None)
        if expenses_data:
            expenses_serializer = ExpensesSerializer(instance.expenses, data=expenses_data)
            if expenses_serializer.is_valid():
                expenses_serializer.save()
        
        # Update AcctStatement fields
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance


class AcctStatementSerializer2(serializers.ModelSerializer):
    expenses = ExpensesSerializer()

    class Meta: 
        model = AcctStatement
        fields = [
            'id', 'sbc', 'balance', 'expenses', 'acf'
        ]

    def create(self, validated_data): 
        print("In statement serializer", validated_data, "\n")
        expensesData = validated_data.pop('expenses')
        expenses = Expenses.objects.create(**expensesData) 
        acctStatement = AcctStatement.objects.create(expenses=expenses, **validated_data)
        return acctStatement

    def update(self, instance, validated_data):
        expenses_data = validated_data.pop('expenses', None)
        if expenses_data:
            expenses_serializer = ExpensesSerializer(instance.expenses, data=expenses_data)
            if expenses_serializer.is_valid():
                expenses_serializer.save()
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance
        

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
        fields = ['id', 'meeting', 'acct_statement', 'acct_announcement']

    def create(self, validated_data):
        # Extract nested data
        acct_statement_data = validated_data.pop('acct_statement')
        acct_announcement_data = validated_data.pop('acct_announcement')

        # Create acct_statement
        acct_statement_serializer = AcctStatementSerializer(data=acct_statement_data)
        acct_statement_serializer.is_valid(raise_exception=True)
        acct_statement = acct_statement_serializer.save()

        # Create acct_announcement
        acct_announcement_serializer = AcctAnnouncementSerializer(data=acct_announcement_data)
        acct_announcement_serializer.is_valid(raise_exception=True)
        acct_announcement = acct_announcement_serializer.save()

        # Create FinancialRecord
        financial_record = FinancialRecord.objects.create(
            acct_statement=acct_statement, 
            acct_announcement=acct_announcement,
            **validated_data
        )
        return financial_record

    
    def update(self, instance, validated_data):
        acct_statement_data = validated_data.pop('acct_statement', None)
        acct_announcement_data = validated_data.pop('acct_announcement', None)

        if acct_statement_data:
            acct_statement_serializer = AcctStatementSerializer(
                instance.acct_statement, 
                data=acct_statement_data
            )
            if acct_statement_serializer.is_valid():
                acct_statement_serializer.save()

        if acct_announcement_data:
            acct_announcement_serializer = AcctAnnouncementSerializer(
                instance.acct_announcement, 
                data=acct_announcement_data
            )
            if acct_announcement_serializer.is_valid():
                acct_announcement_serializer.save()

        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance


class FinancialRecordSerializer2(serializers.ModelSerializer):
    acct_statement = AcctStatementSerializer()
    acct_announcement = AcctAnnouncementSerializer()
    class Meta: 
        model = FinancialRecord
        fields = [
            'id', 'meeting', 'acct_statement', 'acct_announcement'
        ]

    def create(self, validated_data):
        print('In FinancialRecord serializer', validated_data)
        
        acctStatementData = validated_data.pop('acct_statement')
        acctAnnouncementData = validated_data.pop('acct_announcement')
        
        acctStatement = AcctStatementSerializer().create(**acctStatementData)
        acctAnnouncement = AcctAnnouncementSerializer().create(**acctAnnouncementData)

        financialRecord = FinancialRecord.objects.create(
            acct_statement=acctStatement, 
            acct_announcement=acctAnnouncement
            **validated_data)
        return financialRecord



class FinancialSummarySerializer(serializers.ModelSerializer):
    class Meta: 
        model = FinancialSummary
        fields = [
            'id', 'report', 
            'abf', 'sbc', 'expenses', 
            'report_production'
        ]

