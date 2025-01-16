from rest_framework import routers 
from .views import PraesidiumViewSet, ReminderViewSet

router = routers.DefaultRouter()
router.register('praesidium', PraesidiumViewSet)
router.register('reminders', ReminderViewSet)

urlpatterns = router.urls 