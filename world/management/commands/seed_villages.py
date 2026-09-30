from django.core.management.base import BaseCommand
from world.models import Village


CANONICAL_VILLAGES = [
    {
        "id": "leaf",
        "title": "THE HIDDEN LEAF",
        "kanji": "木ノ葉隠れの里 • 火の意志",
        "seal_text": "KONOHAGAKURE",
        "era_tag": "【火ノ国】 LAND OF FIRE",
        "badge_text": "LOCATION 01",
        "image": "/assets/image/leaf viliage.jpg",
        "image_alt": "The Hidden Leaf Village",
        "seal_icon": "fa-fire",
        "badge_icon": "fa-fire",
        "summary": "Founded on the eternal Will of Fire and nestled deep within dense forests, Konoha stands as the primary bastion of the Land of Fire and birthplace of legendary Hokage leadership.",
        "meta_badges": [
            {"icon": "fa-fire", "text": "Fire (火遁)"},
            {"icon": "fa-crown", "text": "Hokage (火影)"},
            {"icon": "fa-shield", "text": "Uchiha / Senju"},
        ],
        "display_order": 1,
    },
    {
        "id": "sand",
        "title": "THE HIDDEN SAND",
        "kanji": "砂隠れの里 • 砂漠の防壁",
        "seal_text": "SUNAGAKURE",
        "era_tag": "【風の国】 LAND OF WIND",
        "badge_text": "LOCATION 02",
        "image": "/assets/image/sand viliage3.jpg",
        "image_alt": "The Hidden Sand Village",
        "seal_icon": "fa-wind",
        "badge_icon": "fa-wind",
        "summary": "Fortified within harsh desert valleys, Sunagakure harnesses the howling winds and arid sands, commanding formidable puppet mastery and resilient Kazekage defense.",
        "meta_badges": [
            {"icon": "fa-wind", "text": "Wind (風遁)"},
            {"icon": "fa-crown", "text": "Kazekage (風影)"},
            {"icon": "fa-shield", "text": "Kazekage Clan"},
        ],
        "display_order": 2,
    },
    {
        "id": "rock",
        "title": "THE HIDDEN ROCK",
        "kanji": "岩隠れの里 • 難攻不落の岩壁",
        "seal_text": "IWAGAKURE",
        "era_tag": "【土の国】 LAND OF EARTH",
        "badge_text": "LOCATION 03",
        "image": "/assets/image/rockk villiage.jpg",
        "image_alt": "The Hidden Rock Village",
        "seal_icon": "fa-mountain",
        "badge_icon": "fa-mountain",
        "summary": "Surrounded by jagged stone mountain ranges and steep ravines, Iwagakure boasts impenetrable natural ramparts, unyielding stone discipline, and tactical Tsuchikage supremacy.",
        "meta_badges": [
            {"icon": "fa-mountain", "text": "Earth (土遁)"},
            {"icon": "fa-crown", "text": "Tsuchikage (土影)"},
            {"icon": "fa-shield", "text": "Kamizuru Clan"},
        ],
        "display_order": 3,
    },
    {
        "id": "cloud",
        "title": "THE HIDDEN CLOUD",
        "kanji": "雲隠れの里 • 雷鳴の高嶺",
        "seal_text": "KUMOGAKURE",
        "era_tag": "【雷の国】 LAND OF LIGHTNING",
        "badge_text": "LOCATION 04",
        "image": "/assets/image/cloud villiage1.jpg",
        "image_alt": "The Hidden Cloud Village",
        "seal_icon": "fa-bolt",
        "badge_icon": "fa-bolt",
        "summary": "Perched high upon cloud-shrouded mountain peaks, Kumogakure channels the raw fury of lightning, famed for thunderous Taijutsu swordsmanship and decisive Raikage authority.",
        "meta_badges": [
            {"icon": "fa-bolt", "text": "Lightning (雷遁)"},
            {"icon": "fa-crown", "text": "Raikage (雷影)"},
            {"icon": "fa-shield", "text": "Yotsuki Clan"},
        ],
        "display_order": 4,
    },
    {
        "id": "mist",
        "title": "THE HIDDEN MIST",
        "kanji": "霧隠れの里 • 深霧の湖島",
        "seal_text": "KIRIGAKURE",
        "era_tag": "【水の国】 LAND OF WATER",
        "badge_text": "LOCATION 05",
        "image": "/assets/image/smoke viliage.jpg",
        "image_alt": "The Hidden Mist Village",
        "seal_icon": "fa-droplet",
        "badge_icon": "fa-droplet",
        "summary": "Enveloped by deep oceanic fog and isolated islands, Kirigakure commands the lethal arts of silent killing, water release mastery, and the legendary Seven Ninja Swordsmen.",
        "meta_badges": [
            {"icon": "fa-droplet", "text": "Water (水遁)"},
            {"icon": "fa-crown", "text": "Mizukage (水影)"},
            {"icon": "fa-shield", "text": "Hozuki Clan"},
        ],
        "display_order": 5,
    },
]


class Command(BaseCommand):
    help = "Seed the 5 canonical Shinobi Villages into PostgreSQL (excludes 'world' UI state)"

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0

        for item in CANONICAL_VILLAGES:
            village_id = item["id"]
            fields = {
                "title": item["title"],
                "kanji": item["kanji"],
                "seal_text": item["seal_text"],
                "era_tag": item["era_tag"],
                "badge_text": item["badge_text"],
                "image": item["image"],
                "image_alt": item["image_alt"],
                "seal_icon": item["seal_icon"],
                "badge_icon": item["badge_icon"],
                "summary": item["summary"],
                "meta_badges": item["meta_badges"],
                "display_order": item["display_order"],
            }
            obj, created = Village.objects.update_or_create(
                id=village_id,
                defaults=fields,
            )
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f"Created Village: {obj.title} [{obj.id}]"))
            else:
                updated_count += 1
                self.stdout.write(self.style.SUCCESS(f"Updated Village: {obj.title} [{obj.id}]"))

        total_in_db = Village.objects.count()
        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully seeded villages: {created_count} created, {updated_count} updated. Total in DB: {total_in_db}."
            )
        )
