from django.urls import path
from . import views

urlpatterns = [
    path('shinobi/', views.list_shinobi_view, name='list_shinobi'),
    path('shinobi/<str:id>/', views.detail_shinobi_view, name='detail_shinobi'),
]
