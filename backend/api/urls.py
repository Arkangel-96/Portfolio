
from django.urls import path
from .views import projects, health

urlpatterns = [
    path("projects/", projects),
    path("healthz/", health),
]