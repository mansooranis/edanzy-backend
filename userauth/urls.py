from django.urls import path, include
from .views import RegistrationAPIView, UserAPIView

app_name = 'userauth'
urlpatterns = [
    path('users/', RegistrationAPIView.as_view()),
    path("user/", UserAPIView.as_view(),)
]   