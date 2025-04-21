# views.py
from django.http import JsonResponse
from django.shortcuts import render

def custom_404_view(request, exception):
    return JsonResponse({'error': 'Page not found'}, status=404)

def custom_500_view(request):
    return JsonResponse({'error': 'Internal server error'}, status=500)

# urls.py
from django.conf.urls import handler404, handler500
from .views import custom_404_view, custom_500_view

handler404 = custom_404_view
handler500 = custom_500_view