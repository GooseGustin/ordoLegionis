from .views import MeetingViewSet
from rest_framework import routers 

router = routers.DefaultRouter()
router.register('meeting', MeetingViewSet)

urlpatterns = router.urls 