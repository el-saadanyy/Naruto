import os
import sys
import json
import subprocess
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from archive.models import Shinobi


class Command(BaseCommand):
    help = 'Seeds canonical 45 Shinobi records into SQLite from frontend/src/components/archive/shinobiData.js'

    def add_arguments(self, parser):
        parser.add_argument(
            '--overwrite',
            action='store_true',
            help='Synchronize and overwrite existing database records with canonical shinobiData.js'
        )

    def handle(self, *args, **options):
        overwrite = options.get('overwrite', False)
        repo_root = settings.BASE_DIR if os.path.exists(os.path.join(settings.BASE_DIR, 'frontend')) else settings.BASE_DIR.parent
        js_file_path = os.path.join(repo_root, 'frontend', 'src', 'components', 'archive', 'shinobiData.js')
        if not os.path.exists(js_file_path):
            self.stderr.write(self.style.ERROR(f"Canonical source file not found: {js_file_path}"))
            sys.exit(1)

        file_uri = Path(js_file_path).as_uri()
        node_script = f"import('{file_uri}').then(m => console.log(JSON.stringify(m.SHINOBI_DATABASE_RECORDS)));"
        try:
            result = subprocess.run(
                ['node', '--input-type=module', '-e', node_script],
                capture_output=True,
                encoding='utf-8',
                check=True,
                cwd=repo_root
            )
            records = json.loads(result.stdout.strip())
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Failed to extract records from shinobiData.js: {e}"))
            sys.exit(1)

        if len(records) != 45:
            self.stderr.write(self.style.WARNING(f"Expected 45 records, got {len(records)}!"))

        created_count = 0
        updated_count = 0
        unchanged_count = 0

        for r in records:
            shinobi = Shinobi.objects.filter(id=r['id']).first()
            if not shinobi:
                Shinobi.objects.create(
                    id=r['id'],
                    name=r.get('name', ''),
                    kanji=r.get('kanji', ''),
                    village=r.get('village', ''),
                    villageDisplay=r.get('villageDisplay', ''),
                    clan=r.get('clan', ''),
                    clanDisplay=r.get('clanDisplay', ''),
                    rank=r.get('rank', ''),
                    rankDisplay=r.get('rankDisplay', ''),
                    status=r.get('status', ''),
                    image=r.get('image', ''),
                    specialty=r.get('specialty', ''),
                    natures=r.get('natures', ''),
                    classification=r.get('classification', ''),
                    summary=r.get('summary', ''),
                    techniques=r.get('techniques', []),
                )
                created_count += 1
            else:
                if overwrite:
                    changed = False
                    fields = [
                        'name', 'kanji', 'village', 'villageDisplay', 'clan', 'clanDisplay',
                        'rank', 'rankDisplay', 'status', 'image', 'specialty', 'natures',
                        'classification', 'summary', 'techniques'
                    ]
                    for f in fields:
                        if getattr(shinobi, f) != r.get(f):
                            setattr(shinobi, f, r.get(f))
                            changed = True

                    if changed:
                        shinobi.save()
                        updated_count += 1
                    else:
                        unchanged_count += 1
                else:
                    unchanged_count += 1

        total = Shinobi.objects.count()

        self.stdout.write(self.style.SUCCESS(
            f"Created: {created_count} | Updated: {updated_count} | Unchanged: {unchanged_count} | Total: {total}"
        ))
