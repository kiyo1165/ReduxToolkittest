from rest_framework import routers
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register('tasks', views.TaskViewSet, basename='tasks')

urlpatterns = [
    path('', include(router.urls)),
    path('myself/' , views.MyProfileView.as_view(), name="myself"),
    path('register/',views.CreateUserView.as_view(), name="register" )
]
