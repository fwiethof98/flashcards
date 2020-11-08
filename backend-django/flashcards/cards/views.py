from django.shortcuts import redirect, render
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework import serializers
from .form import CardForm
from django.utils.http import is_safe_url
from django.conf import settings
from .serializers import CardSerializer, CardActionSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os

from .models import Card
from django.contrib.auth.models import User

from scripts import anki

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# RENDER VIEWS


def cards_test_view(request, *args, **kwargs):
    card_id = request.GET.get("card_id")
    lecture = request.GET.get("lecture")
    return render(request, "cards/test.html", context={"card_id": card_id, "lecture": lecture})


def cards_list_view(request, *args, **kwargs):
    edit = request.GET.get("edit")
    id = request.GET.get("id")
    context = {}
    if edit != None and id != None:
        context = {
            "edit": edit,
            "id": id
        }
    return render(request, "cards/list.html", context=context)


def cards_detail_view(request, card_id, *args, **kwargs):
    return render(request, "cards/detail.html", context={"card_id": card_id})


def cards_profile_view(request, username, *args, **kwargs):
    return render(request, "cards/profile.html", context={"username": username})


def cards_upload_view(request, *args, **kwargs):
    return render(request, "cards/upload.html")


# API VIEWS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def card_upload_api_view(request, *args, **kwargs):
    uploaded_file = request.FILES['file']
    fs = FileSystemStorage()
    fs.save(uploaded_file.name, uploaded_file)
    file_path = f"{settings.BASE_DIR}/media/{uploaded_file.name}"
    cards = anki.convert_to_flashcard(file_path)
    for i in range(len(cards['questions'])):
        question = cards['questions'][i]
        answer = cards['answers'][i]

        obj = Card(question=question, answer=answer,
                   user=request.user, lecture=request.POST['lecture'])
        obj.save()
    os.remove(file_path)
    return JsonResponse({"message": "Upload successful"}, status=200)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def card_create_api_view(request, *args, **kwargs):
    serializer = CardSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=200)
    return Response({}, status=400)


@ api_view(['GET'])
def card_list_api_view(request, *args, **kwargs):
    qs = Card.objects.all()
    username = request.GET.get("username")  # ?username=fwiethof
    if username != None:
        qs = qs.filter(user__username__iexact=username)
    serializer = CardSerializer(qs, many=True)
    return Response(serializer.data, status=200)


@ api_view(['DELETE', 'POST'])
@ permission_classes([IsAuthenticated])
def card_delete_api_view(request, card_id, *args, **kwargs):
    edit = request.GET.get("edit")
    qs = Card.objects.filter(id=card_id)
    if not qs:
        return Response({}, status=404)
    if edit != "true":
        qs = qs.filter(user=request.user)
        if not qs:
            return Response({'message': 'You cannot delete this card'}, status=400)
    qs.first().delete()
    return Response({'message': 'Card removed'}, status=200)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def card_action_api_view(request, *args, **kwargs):
    serializer = CardActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        card_id = data.get("id")
        action = data.get("action")
        qs = Card.objects.filter(id=card_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            if obj.likes.filter(username=request.user.username).first() == request.user:
                obj.likes.remove(request.user)
            else:
                obj.likes.add(request.user)
            serializer = CardSerializer(obj)
            return Response(serializer.data, status=200)
    return Response({}, status=200)


@ api_view(['GET'])
def card_detail_api_view(request, card_id, *args, **kwargs):
    random = request.GET.get("random")
    lecture = request.GET.get("lecture")
    print(lecture)
    print(random)
    if random != None:
        qs = Card.objects.order_by("?")
        if lecture != None:
            qs = qs.filter(lecture=lecture)
    else:
        qs = Card.objects.filter(id=card_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = CardSerializer(obj)
    return Response(serializer.data, status=200)
