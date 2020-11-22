from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

from .serializers import UserProfileSerializer, RoleSerializer, RoleDistributionSerializer
from .models import UserProfile, Role
from django.contrib.auth.models import User


def manage_view(request, *args, **kwargs):
    if is_role(request.user.username, "admin"):
        return render(request, "components/manage.html")
    else:
        return redirect('/')


def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect('/')
    context = {
        "form": form,
        "title": "Login",
        "btn_label": "Login"
    }
    return render(request, "components/auth.html", context)


def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        logout(request)
        return redirect("/login/")
    context = {
        "form": None,
        "title": "Logout",
        "subtitle": "Are you sure you want to log out?",
        "btn_label": "Logout"
    }
    return render(request, "components/auth.html", context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        login(request, user)
        return redirect("/")
    context = {
        "form": form,
        "title": "Register",
        "btn_label": "Register"
    }
    return render(request, "components/auth.html", context)


# USER AND ROLE API REQUESTS


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def user_search_api_view(request, *args, **kwargs):
    if is_role(request.user.username, 'admin'):
        role = request.GET.get("role")
        action = request.GET.get("action")
        if action == "exclude":
            users = UserProfile.objects.exclude(role__name=role)
        elif action == "include":
            users = UserProfile.objects.filter(role__name=role)
        elif action == "all":
            users = UserProfile.objects.all()
        else:
            return Response({'message': 'Invalid action.'}, status=400)
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=200)
    else:
        return Response({'message': 'Request not authenticated, wrong role.'}, status=403)


@ api_view(['DELETE'])
@ permission_classes([IsAuthenticated])
def user_delete_api_view(request, *args, **kwargs):
    if is_role(request.user.username, 'admin'):
        user = User.objects.filter(
            username=request.data['username']).first().delete()
        return Response({'message': 'User deleted'}, status=200)
    else:
        return Response({'message': 'Request not authenticated, wrong role.'}, status=403)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def role_search_api_view(request, *args, **kwargs):
    if is_role(request.user.username, 'admin'):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data, status=200)
    else:
        return Response({'message': 'Request not authenticated, wrong role.'}, status=403)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def role_create_api_view(request, *args, **kwargs):
    if is_role(request.user.username, 'admin'):
        role = Role(name=request.data)
        role.save()
        return Response({'message': 'Role created', 'data': request.data}, status=200)
    else:
        return Response({'message': 'Request not authenticated, wrong role.'}, status=403)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def role_assign_api_view(request, *args, **kwargs):
    if is_role(request.user.username, 'admin'):
        action = request.data['action']
        username = request.data['username']
        role = request.data['role']
        profile = User.objects.filter(username=username).first().userprofile
        role = Role.objects.filter(name=role).first()
        if action == 'assign':
            profile.role.add(role)
            return Response({'message': 'Role assigned to user'}, status=200)
        elif action == 'delete':
            profile.role.remove(role)
            return Response({'message': 'Role removed from user'}, status=200)
        else:
            return Response({'message': 'Action not valid'}, status=200)

    else:
        return Response({'message': 'Request not authenticated, wrong role.'}, status=403)


# HELPER FUNCTIONS


def is_role(username, role):
    user = UserProfile.objects.filter(
        user__username=username)
    user = user.filter(role__name=role).first()
    if user != None:
        return True
    return False
