import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def csrf_view(request):
    """
    Ensure the CSRF cookie is set on the client and return the CSRF token.
    """
    token = get_token(request)
    return JsonResponse({"csrfToken": token, "status": "ok"})


@require_http_methods(["GET"])
def current_user_view(request):
    """
    Return current authenticated user status and details from session.
    """
    if request.user.is_authenticated:
        return JsonResponse({
            "authenticated": True,
            "user": {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
            }
        })
    return JsonResponse({
        "authenticated": False,
        "user": None,
    })


@require_http_methods(["GET"])
def profile_view(request):
    """
    Return profile data for the currently authenticated user including favorite counts.
    """
    if not request.user.is_authenticated:
        return JsonResponse({"error": "Authentication required to access shinobi profile."}, status=401)

    fav_count = request.user.favorites.count() if hasattr(request.user, 'favorites') else 0

    return JsonResponse({
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email,
        "date_joined": request.user.date_joined.isoformat(),
        "favorite_count": fav_count,
    }, status=200)



@require_http_methods(["POST"])
def signup_view(request):
    """
    Register a new shinobi User, hash password, log into session, and return user.
    """
    try:
        data = json.loads(request.body or '{}')
    except (ValueError, json.JSONDecodeError):
        return JsonResponse({"error": "Malformed JSON payload."}, status=400)

    username = (data.get("username") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    confirm_password = data.get("confirm_password") or data.get("confirmPassword") or ""

    # 1. Field presence validation
    if not username:
        return JsonResponse({"error": "Shinobi handle / username is required."}, status=400)
    if not email:
        return JsonResponse({"error": "Ninja registry email is required."}, status=400)
    if not password:
        return JsonResponse({"error": "Secret seal / password is required."}, status=400)
    if not confirm_password:
        return JsonResponse({"error": "Password confirmation is required."}, status=400)

    # 2. Confirm password match
    if password != confirm_password:
        return JsonResponse({"error": "Secret seals / passwords do not match."}, status=400)

    # 3. Validate email format
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"error": "Enter a valid ninja registry email address."}, status=400)

    # 4. Validate username uniqueness
    if User.objects.filter(username__iexact=username).exists():
        return JsonResponse({"error": f"Shinobi handle '{username}' is already claimed by another ninja."}, status=400)

    # 5. Validate password requirements
    try:
        validate_password(password)
    except ValidationError as e:
        return JsonResponse({"error": " ".join(e.messages)}, status=400)

    # 6. Create user with hashed password
    try:
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
    except Exception as e:
        return JsonResponse({"error": f"Failed to register shinobi: {str(e)}"}, status=500)

    # 7. Log in automatically into Django session
    login(request, user)

    return JsonResponse({
        "authenticated": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
    }, status=201)


@require_http_methods(["POST"])
def login_view(request):
    """
    Authenticate shinobi credentials and create Django session.
    """
    try:
        data = json.loads(request.body or '{}')
    except (ValueError, json.JSONDecodeError):
        return JsonResponse({"error": "Malformed JSON payload."}, status=400)

    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return JsonResponse({"error": "Both username and password are required."}, status=400)

    user = authenticate(request, username=username, password=password)

    if user is None:
        return JsonResponse({"error": "Invalid shinobi handle or secret seal."}, status=400)

    if not user.is_active:
        return JsonResponse({"error": "Shinobi account is inactive."}, status=403)

    login(request, user)

    return JsonResponse({
        "authenticated": True,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }
    }, status=200)


@require_http_methods(["POST"])
def logout_view(request):
    """
    Invalidate current Django session and log out user.
    """
    logout(request)
    return JsonResponse({
        "message": "Successfully logged out.",
        "authenticated": False,
    }, status=200)
