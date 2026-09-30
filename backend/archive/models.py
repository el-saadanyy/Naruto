from django.db import models
from django.core.exceptions import ValidationError


class Shinobi(models.Model):
    VALID_VILLAGES = {'leaf', 'sand', 'rock', 'cloud', 'mist', 'other'}
    VALID_RANKS = {'kage', 'jonin', 'chunin', 'genin'}
    VALID_STATUSES = {'active', 'deceased'}
    VALID_CLANS = {'uzumaki', 'uchiha', 'senju', 'sarutobi', 'hyuga', 'nara', 'other'}

    id = models.CharField(max_length=32, primary_key=True)
    name = models.CharField(max_length=64)
    kanji = models.CharField(max_length=32)
    village = models.CharField(max_length=32, db_index=True)
    villageDisplay = models.CharField(max_length=64)
    clan = models.CharField(max_length=32, db_index=True)
    clanDisplay = models.CharField(max_length=64)
    rank = models.CharField(max_length=32, db_index=True)
    rankDisplay = models.CharField(max_length=64)
    status = models.CharField(max_length=32, db_index=True)
    image = models.CharField(max_length=255)
    specialty = models.CharField(max_length=128)
    natures = models.CharField(max_length=128)
    classification = models.CharField(max_length=128)
    summary = models.TextField()
    techniques = models.JSONField(default=list)

    class Meta:
        ordering = ['id']
        verbose_name = 'Shinobi'
        verbose_name_plural = 'Shinobi'

    def __str__(self):
        return f"{self.name} [{self.id}]"

    def clean(self):
        super().clean()

        # 1. Status validation
        if self.status:
            normalized_status = self.status.strip().lower()
            if normalized_status not in self.VALID_STATUSES:
                raise ValidationError({
                    'status': f"Invalid status '{self.status}'. Must be one of: {', '.join(sorted(self.VALID_STATUSES))}."
                })
            self.status = normalized_status

        # 2. Rank validation
        if self.rank:
            normalized_rank = self.rank.strip().lower()
            if normalized_rank not in self.VALID_RANKS:
                raise ValidationError({
                    'rank': f"Invalid rank '{self.rank}'. Must be one of: {', '.join(sorted(self.VALID_RANKS))}."
                })
            self.rank = normalized_rank

        # 3. Village validation
        if self.village:
            normalized_village = self.village.strip().lower()
            if normalized_village not in self.VALID_VILLAGES:
                raise ValidationError({
                    'village': f"Invalid village '{self.village}'. Must be one of: {', '.join(sorted(self.VALID_VILLAGES))}."
                })
            self.village = normalized_village

        # 4. Clan validation
        if self.clan:
            normalized_clan = self.clan.strip().lower()
            if normalized_clan not in self.VALID_CLANS:
                raise ValidationError({
                    'clan': f"Invalid clan '{self.clan}'. Must be one of: {', '.join(sorted(self.VALID_CLANS))}."
                })
            self.clan = normalized_clan

        # 5. Techniques validation
        if not isinstance(self.techniques, list):
            raise ValidationError({
                'techniques': "Techniques must be a JSON array (list) of strings."
            })
        for idx, item in enumerate(self.techniques):
            if not isinstance(item, str) or not item.strip():
                raise ValidationError({
                    'techniques': f"Each technique must be a non-empty string. Invalid element at index {idx}."
                })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "kanji": self.kanji,
            "village": self.village,
            "villageDisplay": self.villageDisplay,
            "clan": self.clan,
            "clanDisplay": self.clanDisplay,
            "rank": self.rank,
            "rankDisplay": self.rankDisplay,
            "status": self.status,
            "image": self.image,
            "specialty": self.specialty,
            "natures": self.natures,
            "classification": self.classification,
            "summary": self.summary,
            "techniques": self.techniques,
        }
