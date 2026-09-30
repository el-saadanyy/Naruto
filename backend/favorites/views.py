import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Favorite


@require_http_methods(["GET"])
def list_favorites_view(request):
    """
    List all favorites for the currently authenticated user.
    """
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required to access favorites."}, status=401)

    favs = Favorite.objects.filter(user=request.user)
    fav_list = [
        {
            "id": f.id,
            "item_type": f.item_type,
            "item_id": f.item_id,
            "item_title": f.item_title,
            "item_image": f.item_image,
            "created_at": f.created_at.isoformat(),
        }
        for f in favs
    ]

    return JsonResponse({
        "favorites": fav_list,
        "count": len(fav_list),
    }, status=200)


VALID_CLAN_IDS = {
    "uchiha", "senju", "hyuga", "uzumaki", "nara", "sarutobi",
    "aburame", "akimichi", "inuzuka", "yamanaka", "kaguya",
}

VALID_VILLAGE_IDS = {
    "leaf", "sand", "rock", "cloud", "mist",
}

VALID_BIJUU_IDS = {
    "bijuu-shukaku", "bijuu-matatabi", "bijuu-isobu", "bijuu-son-goku",
    "bijuu-kokuo", "bijuu-saiken", "bijuu-chomei", "bijuu-gyuki", "bijuu-kurama",
}


@require_http_methods(["POST"])
def toggle_favorite_view(request):
    """
    Toggle a favorite entry for the currently authenticated user.
    If it exists, remove it; if not, create it.
    """
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required to bookmark items."}, status=401)

    try:
        data = json.loads(request.body or '{}')
    except (ValueError, json.JSONDecodeError):
        return JsonResponse({"error": "Malformed JSON payload."}, status=400)

    item_id = str(data.get("item_id") or "").strip()
    item_type = str(data.get("item_type") or "shinobi").strip().lower()
    item_title = str(data.get("item_title") or "").strip()
    item_image = str(data.get("item_image") or "").strip()

    if not item_id:
        return JsonResponse({"error": "item_id is required to bookmark an item."}, status=400)

    # Validate allowed item types
    allowed_types = dict(Favorite.ITEM_TYPE_CHOICES).keys()
    if item_type not in allowed_types:
        return JsonResponse({
            "error": f"Invalid item_type '{item_type}'. Allowed types are: {', '.join(allowed_types)}."
        }, status=400)

    # Validate clan IDs if item_type is clan
    if item_type == "clan" and item_id not in VALID_CLAN_IDS:
        return JsonResponse({
            "error": f"Invalid clan ID '{item_id}'."
        }, status=400)

    # Validate village IDs if item_type is village
    if item_type == "village" and item_id not in VALID_VILLAGE_IDS:
        return JsonResponse({
            "error": f"Invalid village ID '{item_id}'."
        }, status=400)

    # Validate bijuu IDs if item_type is bijuu
    if item_type == "bijuu" and item_id not in VALID_BIJUU_IDS:
        return JsonResponse({
            "error": f"Invalid bijuu ID '{item_id}'."
        }, status=400)

    existing_fav = Favorite.objects.filter(
        user=request.user,
        item_type=item_type,
        item_id=item_id
    ).first()

    if existing_fav:
        existing_fav.delete()
        return JsonResponse({
            "favorited": False,
            "item_id": item_id,
            "item_type": item_type,
            "message": f"Removed from {item_type} favorites.",
        }, status=200)
    else:
        fav = Favorite.objects.create(
            user=request.user,
            item_type=item_type,
            item_id=item_id,
            item_title=item_title,
            item_image=item_image
        )
        return JsonResponse({
            "favorited": True,
            "item_id": item_id,
            "item_type": item_type,
            "message": f"Saved to {item_type} favorites.",
            "favorite": {
                "id": fav.id,
                "item_id": fav.item_id,
                "item_type": fav.item_type,
                "item_title": fav.item_title,
                "item_image": fav.item_image,
                "created_at": fav.created_at.isoformat(),
            }
        }, status=201)
