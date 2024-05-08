from django.core.management.base import BaseCommand
from api.models import Book
import os

class Command(BaseCommand):
    help = 'Updates book entries with cover images'

    def handle(self, *args, **options):
        books = Book.objects.all()
        for book in books:
            image_path = f'book_covers/{book.isbn}.jpg'
            if os.path.exists(f'media/{image_path}'):
                book.cover_image = image_path
                book.save()
                self.stdout.write(self.style.SUCCESS(f'Successfully updated cover for {book.title}'))
            else:
                self.stdout.write(self.style.WARNING(f'Cover image not found for {book.title}'))
