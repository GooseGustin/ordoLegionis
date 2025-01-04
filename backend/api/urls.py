from django.urls import include, path


app_name = 'api'
urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('social/', include('social.urls')),
]