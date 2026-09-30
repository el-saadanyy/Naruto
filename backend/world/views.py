from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Village


@require_http_methods(["GET"])
def list_villages_view(request):
    """
    Public read-only list of all canonical Shinobi Villages.
    Ordered by display_order (leaf, sand, rock, cloud, mist).
    """
    qs = Village.objects.all().order_by('display_order', 'id')
    results = [v.to_dict() for v in qs]

    return JsonResponse({
        "count": len(results),
        "results": results,
    }, status=200)


@require_http_methods(["GET"])
def detail_village_view(request, id):
    """
    Public read-only detail dossier for a single canonical Shinobi Village.
    """
    village = Village.objects.filter(id__iexact=id.strip()).first()
    if not village:
        return JsonResponse({"error": "Village not found."}, status=404)

    return JsonResponse(village.to_dict(), status=200)
