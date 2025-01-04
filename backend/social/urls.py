from rest_framework import routers 
from .views import AnswerViewSet, PostViewSet, QuestionViewSet

router = routers.DefaultRouter()
router.register('answers', AnswerViewSet)
router.register('posts', PostViewSet)
router.register('questions', QuestionViewSet)

urlpatterns = router.urls 