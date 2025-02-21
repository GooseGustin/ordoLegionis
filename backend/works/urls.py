from rest_framework import routers 
from .views import * 

router = routers.DefaultRouter()
router.register('work', WorkViewSet)
router.register('work_list', WorkListViewSet)
router.register('work_summary', WorkSummaryViewSet)
router.register('work_type_option', WorkTypeOptionViewSet)

urlpatterns = router.urls 