from rest_framework import routers 
from .views import PraesidiumViewSet, ReminderViewSet

router = routers.DefaultRouter()
router.register('praesidium', PraesidiumViewSet)
router.register('reminder', ReminderViewSet)

urlpatterns = router.urls 