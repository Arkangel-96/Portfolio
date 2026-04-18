
from django.http import JsonResponse
from .models import Project

def projects(request):
    projects = Project.objects.all()
    data = []

    for p in projects:
        data.append({
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "image": request.build_absolute_uri(p.image.url) if p.image else "",
            "link": p.link,
        })

    return JsonResponse(data, safe=False)


def health(request):
    return JsonResponse({"status": "ok"})