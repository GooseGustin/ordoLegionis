from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Work)
admin.site.register(WorkList)
admin.site.register(WorkTypeOption)
admin.site.register(WorkSummary)