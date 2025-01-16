from .views import MeetingViewSet
from rest_framework import routers 

router = routers.DefaultRouter()
router.register('meetings', MeetingViewSet)

urlpatterns = router.urls 