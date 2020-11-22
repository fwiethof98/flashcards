from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def lecture_create_api_view(request, *args, **kwargs):
    return Response({}, status=200)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def lecture_search_api_view(request, *args, **kwargs):
    return Response({}, status=200)


@ api_view(['POST', 'DELETE'])
@ permission_classes([IsAuthenticated])
def lecture_assign_api_view(request, *args, **kwargs):
    return Response({}, status=200)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def study_create_api_view(request, *args, **kwargs):
    return Response({}, status=200)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def study_search_api_view(request, *args, **kwargs):
    return Response({}, status=200)


@ api_view(['POST', 'DELETE'])
def study_assign_api_view(request, *args, **kwargs):
    return Response({}, status=200)
