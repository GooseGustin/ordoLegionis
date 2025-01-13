from rest_framework import routers 
from .views import AnnouncementViewSet, CuriaViewSet

router = routers.DefaultRouter()
router.register('announcements', AnnouncementViewSet)
router.register('curia', CuriaViewSet)

urlpatterns = router.urls 