from django.urls import path 
from .views import * 
from rest_framework import routers 
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register('legionary', LegionaryViewSet)
urlpatterns = router.urls 
urlpatterns += [
    path('register/', UserRegistrationAPIView.as_view(), name='register-user'), 
    path('login/', UserLoginAPIView.as_view(), name='login-user'), 
    path('logout/', UserLogoutAPIView.as_view(), name='logout-user'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('user/', UserInfoAPIView.as_view(), name='user-info'),
]