
from django.http import HttpResponse
from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

def home(request):
    return HttpResponse("Backend funcionando 🚀")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)