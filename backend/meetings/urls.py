from django.urls import path 
from .views import MeetingFilterView, MeetingViewSet
from rest_framework import routers 

router = routers.DefaultRouter()
router.register('meetings', MeetingViewSet)

urlpatterns = router.urls 
urlpatterns += [
    path('filter_meetings', MeetingFilterView.as_view(), name='filter-meetings')
]