import json
from django.test import TestCase, Client
from django.core.management import call_command
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from archive.models import Shinobi
from favorites.models import Favorite


class ShinobiModelAndSeedTests(TestCase):
    def setUp(self):
        call_command('seed_shinobi')

    def test_01_all_45_canonical_records_exist(self):
        self.assertEqual(Shinobi.objects.count(), 45)

    def test_02_ids_are_unique(self):
        ids = list(Shinobi.objects.values_list('id', flat=True))
        self.assertEqual(len(ids), 45)
        self.assertEqual(len(set(ids)), 45)

    def test_03_canonical_id_is_preserved(self):
        naruto = Shinobi.objects.get(id='KN-012607')
        self.assertEqual(naruto.name, 'Naruto Uzumaki')
        self.assertEqual(naruto.village, 'leaf')
        self.assertEqual(naruto.rank, 'kage')

        gaara = Shinobi.objects.get(id='SN-015842')
        self.assertEqual(gaara.name, 'Gaara')
        self.assertEqual(gaara.village, 'sand')

    def test_04_json_fields_are_arrays(self):
        naruto = Shinobi.objects.get(id='KN-012607')
        self.assertIsInstance(naruto.techniques, list)
        self.assertGreaterEqual(len(naruto.techniques), 1)
        self.assertIn('Wind Release: Rasenshuriken', naruto.techniques)

    def test_05_required_fields_are_populated(self):
        for s in Shinobi.objects.all():
            self.assertTrue(s.id)
            self.assertTrue(s.name)
            self.assertTrue(s.kanji)
            self.assertTrue(s.village)
            self.assertTrue(s.villageDisplay)
            self.assertTrue(s.clan)
            self.assertTrue(s.clanDisplay)
            self.assertTrue(s.rank)
            self.assertTrue(s.rankDisplay)
            self.assertTrue(s.status)
            self.assertTrue(s.image)
            self.assertTrue(s.specialty)
            self.assertTrue(s.natures)
            self.assertTrue(s.classification)
            self.assertTrue(s.summary)
            self.assertTrue(s.techniques)

    def test_06_seed_idempotency(self):
        # Running seed again without --overwrite should keep exact count of 45 without duplicates
        call_command('seed_shinobi')
        self.assertEqual(Shinobi.objects.count(), 45)

    def test_07_seed_default_does_not_overwrite_existing_edits(self):
        # Manually alter a record in DB via CMS edit
        naruto = Shinobi.objects.get(id='KN-012607')
        naruto.summary = 'CMS Custom Modified Intelligence Summary.'
        naruto.save()

        # Running default seed_shinobi MUST NOT overwrite existing records
        call_command('seed_shinobi')
        naruto.refresh_from_db()
        self.assertEqual(naruto.summary, 'CMS Custom Modified Intelligence Summary.')

    def test_08_seed_overwrite_flag_synchronizes_edits(self):
        # Alter record in DB
        naruto = Shinobi.objects.get(id='KN-012607')
        naruto.specialty = 'Temporary Custom Specialty'
        naruto.save()

        # Running seed_shinobi --overwrite synchronizes with canonical dataset
        call_command('seed_shinobi', overwrite=True)
        naruto.refresh_from_db()
        self.assertEqual(naruto.specialty, 'Rasengan / Sage Mode / Kurama Link')

    def test_09_seed_does_not_delete_custom_records(self):
        # Create custom user-authored record not present in shinobiData.js
        custom = Shinobi.objects.create(
            id='CUSTOM-999999',
            name='Custom Shadow Operative',
            kanji='影の忍',
            village='leaf',
            villageDisplay='Konohagakure',
            clan='uchiha',
            clanDisplay='Uchiha Clan',
            rank='jonin',
            rankDisplay='Special Jonin',
            status='active',
            image='/assets/image/shinobi_custom.png',
            specialty='Shadow Cloaking',
            natures='Fire, Lightning',
            classification='ANBU Black Ops',
            summary='Classified covert operative.',
            techniques=['Shadow Clone Jutsu', 'Fire Release: Great Fireball']
        )
        self.assertEqual(Shinobi.objects.count(), 46)

        # Running seed_shinobi does not delete or alter custom records
        call_command('seed_shinobi')
        self.assertEqual(Shinobi.objects.count(), 46)
        self.assertTrue(Shinobi.objects.filter(id='CUSTOM-999999').exists())

    def test_10_seed_does_not_affect_favorites(self):
        user = User.objects.create_user(username='ninja_tester', password='SecretPassword123!')
        Favorite.objects.create(
            user=user,
            item_type='shinobi',
            item_id='KN-012607',
            item_title='Naruto Uzumaki'
        )
        self.assertEqual(Favorite.objects.count(), 1)

        call_command('seed_shinobi')
        self.assertEqual(Favorite.objects.count(), 1)
        self.assertEqual(Favorite.objects.first().item_id, 'KN-012607')


class ShinobiValidationTests(TestCase):
    def setUp(self):
        call_command('seed_shinobi')

    def test_20_valid_techniques_list_accepted(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.techniques = ['Rasengan', 'Shadow Clone Technique', 'Sage Art: Massive Rasengan Mega Barrage']
        s.save()
        s.refresh_from_db()
        self.assertEqual(len(s.techniques), 3)

    def test_21_invalid_techniques_dict_rejected(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.techniques = {'primary': 'Rasengan'}
        with self.assertRaises(ValidationError):
            s.save()

    def test_22_invalid_techniques_primitive_rejected(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.techniques = 'Rasengan, Shadow Clone'
        with self.assertRaises(ValidationError):
            s.save()

    def test_23_non_string_technique_item_rejected(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.techniques = ['Rasengan', 12345, 'Shadow Clone']
        with self.assertRaises(ValidationError):
            s.save()

    def test_24_empty_technique_string_rejected(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.techniques = ['Rasengan', '   ', 'Shadow Clone']
        with self.assertRaises(ValidationError):
            s.save()

    def test_25_invalid_status_rejected(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.status = 'reanimated_zombie'
        with self.assertRaises(ValidationError):
            s.save()

    def test_26_invalid_rank_rejected(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.rank = 'god_of_shinobi'
        with self.assertRaises(ValidationError):
            s.save()

    def test_27_invalid_village_rejected(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.village = 'atlantis'
        with self.assertRaises(ValidationError):
            s.save()

    def test_28_invalid_clan_rejected(self):
        s = Shinobi.objects.get(id='KN-012607')
        s.clan = 'super_saiyan'
        with self.assertRaises(ValidationError):
            s.save()


class ShinobiAPITests(TestCase):
    def setUp(self):
        self.client = Client()
        call_command('seed_shinobi')

    def test_30_get_list_without_auth(self):
        response = self.client.get('/api/archive/shinobi/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 45)
        self.assertEqual(len(data['results']), 45)

    def test_31_get_detail_success(self):
        response = self.client.get('/api/archive/shinobi/KN-012607/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['id'], 'KN-012607')
        self.assertEqual(data['name'], 'Naruto Uzumaki')
        self.assertEqual(data['village'], 'leaf')
        self.assertIsInstance(data['techniques'], list)

    def test_32_get_detail_not_found(self):
        response = self.client.get('/api/archive/shinobi/NON_EXISTENT_ID_9999/')
        self.assertEqual(response.status_code, 404)
        data = response.json()
        self.assertIn('error', data)
        self.assertEqual(data['error'], 'Shinobi not found.')

    def test_33_search_by_name(self):
        response = self.client.get('/api/archive/shinobi/?search=Sasuke')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(data['count'], 1)
        names = [s['name'] for s in data['results']]
        self.assertIn('Sasuke Uchiha', names)

    def test_34_search_by_kanji(self):
        response = self.client.get('/api/archive/shinobi/?search=我愛羅')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(data['count'], 1)
        self.assertEqual(data['results'][0]['id'], 'SN-015842')

    def test_35_search_by_specialty_or_summary(self):
        response = self.client.get('/api/archive/shinobi/?search=Rasengan')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(data['count'], 1)

    def test_36_filter_by_village(self):
        response = self.client.get('/api/archive/shinobi/?village=sand')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 4)
        for s in data['results']:
            self.assertEqual(s['village'], 'sand')

    def test_37_filter_by_rank(self):
        response = self.client.get('/api/archive/shinobi/?rank=kage')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 13)
        for s in data['results']:
            self.assertEqual(s['rank'], 'kage')

    def test_38_filter_by_clan(self):
        response = self.client.get('/api/archive/shinobi/?clan=uchiha')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 5)
        for s in data['results']:
            self.assertEqual(s['clan'], 'uchiha')

    def test_39_filter_by_status(self):
        response = self.client.get('/api/archive/shinobi/?status=deceased')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 22)
        for s in data['results']:
            self.assertEqual(s['status'], 'deceased')

    def test_40_combined_filters(self):
        response = self.client.get('/api/archive/shinobi/?village=leaf&rank=jonin&status=active')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        for s in data['results']:
            self.assertEqual(s['village'], 'leaf')
            self.assertEqual(s['rank'], 'jonin')
            self.assertEqual(s['status'], 'active')

    def test_41_unknown_filter_returns_empty_safely(self):
        response = self.client.get('/api/archive/shinobi/?village=non_existent_village')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['count'], 0)
        self.assertEqual(data['results'], [])

