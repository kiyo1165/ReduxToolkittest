from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):

    def validate_password(self, value: str) -> str:
        return make_password(value)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    #user情報をハッシュ化して保存
    def crate(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class TaskSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'created_at', 'updated_at')

