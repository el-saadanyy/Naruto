from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.db.models import Q
from .models import Shinobi


@require_http_methods(["GET"])
def list_shinobi_view(request):
    """
    Public read-only list of all canonical Shinobi records.
    Supports search and filtering by village, rank, clan, status.
    """
    qs = Shinobi.objects.all()

    # 1. Search filter
    search = request.GET.get('search', '').strip()
    if search:
        qs = qs.filter(
            Q(name__icontains=search) |
            Q(kanji__icontains=search) |
            Q(specialty__icontains=search) |
            Q(summary__icontains=search) |
            Q(villageDisplay__icontains=search) |
            Q(clanDisplay__icontains=search) |
            Q(rankDisplay__icontains=search) |
            Q(classification__icontains=search)
        )

    # 2. Village filter
    village = request.GET.get('village', '').strip().lower()
    if village and village != 'all':
        qs = qs.filter(village__iexact=village)

    # 3. Rank filter
    rank = request.GET.get('rank', '').strip().lower()
    if rank and rank != 'all':
        qs = qs.filter(rank__iexact=rank)

    # 4. Clan filter
    clan = request.GET.get('clan', '').strip().lower()
    if clan and clan != 'all':
        qs = qs.filter(clan__iexact=clan)

    # 5. Status filter
    status = request.GET.get('status', '').strip().lower()
    if status and status != 'all':
        qs = qs.filter(status__iexact=status)

    results = [s.to_dict() for s in qs]

    return JsonResponse({
        "count": len(results),
        "results": results,
    }, status=200)


@require_http_methods(["GET"])
def detail_shinobi_view(request, id):
    """
    Public read-only detail dossier for a single canonical Shinobi record.
    """
    shinobi = Shinobi.objects.filter(id__iexact=id.strip()).first()
    if not shinobi:
        return JsonResponse({"error": "Shinobi not found."}, status=404)

    return JsonResponse(shinobi.to_dict(), status=200)
