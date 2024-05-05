from django.core.management.base import BaseCommand, CommandError
from api.models import Book, Genre
from dateutil.parser import parse
import json

class Command(BaseCommand):
    help = 'Imports books from a JSON file into the database, checking for duplicates'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='The JSON file to import')

    def handle(self, *args, **options):
        try:
            with open(options['json_file'], 'r') as file:
                books = json.load(file)

            for book_data in books:
                genres = book_data.pop('genres', [])
                try:
                    book_data['publication_date'] = parse(book_data['publication_date']).date()
                except ValueError as e:
                    self.stdout.write(self.style.ERROR(f"Error parsing date for book {book_data['title']}: {e}"))
                    continue

                # Check for existing book by ISBN
                isbn = book_data.get('isbn')
                if isbn and Book.objects.filter(isbn=isbn).exists():
                    self.stdout.write(self.style.WARNING(f'Book with ISBN {isbn} already exists and was not added.'))
                    continue

                book, created = Book.objects.get_or_create(isbn=isbn, defaults=book_data)

                for genre_name in genres:
                    genre, _ = Genre.objects.get_or_create(name=genre_name)
                    book.genres.add(genre)

                self.stdout.write(self.style.SUCCESS(f'Successfully {"added" if created else "updated"} book "{book.title}"'))

        except FileNotFoundError:
            raise CommandError('File "%s" does not exist' % options['json_file'])
        except Exception as e:
            raise CommandError(f'An error occurred: {str(e)}')

