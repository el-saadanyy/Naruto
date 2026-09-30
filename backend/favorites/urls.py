from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_favorites_view, name='list_favorites'),
    path('toggle/', views.toggle_favorite_view, name='toggle_favorite'),
]
