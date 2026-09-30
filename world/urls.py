from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_villages_view, name='list_villages'),
    path('<str:id>/', views.detail_village_view, name='detail_village'),
]
