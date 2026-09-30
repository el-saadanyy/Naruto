from django.db import models


class Village(models.Model):
    id = models.CharField(max_length=32, primary_key=True)
    title = models.CharField(max_length=64)
    kanji = models.CharField(max_length=64)
    seal_text = models.CharField(max_length=64)
    era_tag = models.CharField(max_length=64)
    badge_text = models.CharField(max_length=32)
    image = models.CharField(max_length=255)
    image_alt = models.CharField(max_length=128)
    seal_icon = models.CharField(max_length=32, default='fa-compass')
    badge_icon = models.CharField(max_length=32, default='fa-compass')
    summary = models.TextField()
    meta_badges = models.JSONField(default=list)
    display_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = 'Village'
        verbose_name_plural = 'Villages'

    def __str__(self):
        return f"{self.title} [{self.id}]"

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "kanji": self.kanji,
            "seal_text": self.seal_text,
            "era_tag": self.era_tag,
            "badge_text": self.badge_text,
            "image": self.image,
            "image_alt": self.image_alt,
            "seal_icon": self.seal_icon,
            "badge_icon": self.badge_icon,
            "summary": self.summary,
            "meta_badges": self.meta_badges,
            "display_order": self.display_order,
        }
