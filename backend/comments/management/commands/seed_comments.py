# comments/management/commands/seed_comments.py
import json
from django.core.management.base import BaseCommand
from comments.models import Comment
from pathlib import Path

class Command(BaseCommand):
    help = 'Seeds the database from comments.json'

    def handle(self, *args, **kwargs):
        Comment.objects.all().delete()
        self.stdout.write("Deleted old comments.")

        json_file_path = Path(__file__).parent.parent.parent / 'comments.json'

        with open(json_file_path) as f:
            data = json.load(f)

        for item in data['comments']:
            Comment.objects.create(
                author=item['author'],
                text=item['text'],
                date=item['date'],
                likes=item['likes'],
                image=item['image']
            )
        self.stdout.write(self.style.SUCCESS('Successfully seeded comments.'))