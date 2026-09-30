from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.csrf_view, name='csrf'),
    path('user/', views.current_user_view, name='current_user'),
    path('profile/', views.profile_view, name='profile'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]
