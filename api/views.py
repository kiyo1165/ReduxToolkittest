from .models import Task
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, generics
from .serializers import TaskSerializer, UserSerializer

# 新規アカウント作成
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )


class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    #ログインしている自身のみ
    def get_object(self):
        return self.request.user

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

