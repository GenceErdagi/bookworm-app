from django.core.management.base import BaseCommand
import json
import random
from django.db import transaction
from books.models import Book
from users.models import UserProfile, Review

class Command(BaseCommand):
    help = 'Imports users and assigns them wishlists and reviews'

    def handle(self, *args, **options):
        with open('users.json', 'r') as file:
            user_data_list = json.load(file)

        for user_data in user_data_list:
            self.stdout.write(self.style.SUCCESS(f"Importing {user_data['username']}"))
            user_profile = self.create_user(user_data)
            all_books = list(Book.objects.all())
            random.shuffle(all_books)

            mid_point = len(all_books) // 2
            # Ensure no overlap and each has 10-15 books
            wishlist_books = all_books[:mid_point][:15]
            review_books = all_books[mid_point:][:15]
            if len(wishlist_books) < 10:
                wishlist_books = all_books[:10]
            if len(review_books) < 10:
                review_books = all_books[mid_point:mid_point+10]

            self.manage_wishlist(user_profile, wishlist_books)
            self.add_reviews(user_profile, review_books)
            self.stdout.write(self.style.SUCCESS(f"User {user_profile.username}'s profile, wishlist, and reviews created successfully."))

    def create_user(self, user_data):
        user_profile = UserProfile.objects.create_user(
            username=user_data['username'], 
            email=user_data['email'], 
            password=user_data['password']
        )
        return user_profile

    def manage_wishlist(self, user_profile, books):
        user_profile.wishlist.set(books)
        user_profile.save()

    def add_reviews(self, user_profile, books):
        # Define sample comment options for reviews
        comment_options = {
            1: [
                "This was a huge disappointment and a waste of time.",
                "I struggled to finish this book; it was downright boring.",
                "Very poorly written with a plot that makes little sense.",
                "I didn't find any redeeming qualities in this book.",
                "Full of clichés and lacking any originality.",
                "The characters were unlikable and flat throughout the story.",
                "Filled with errors and inconsistencies that were too distracting.",
                "Unfortunately, it's one of the worst books I've ever read.",
                "Left a lot to be desired from both a storytelling and literary perspective.",
                "I couldn't connect with the story or the characters at all.",
                "Not engaging or enjoyable in any way.",
                "Seems like it was hastily written without much thought.",
                "Failed to deliver on its promising premise.",
                "I regret picking this up; it didn't hold my interest.",
                "Absolutely not what I was hoping for; I was frustrated by the end.",
                "It's hard to see how this could be anyone's favorite book.",
                "More of a chore to get through than an enjoyable read.",
                "This book lacks depth, character development, and excitement.",
                "Terribly executed with a storyline that fell apart.",
                "A painful read from start to finish."
            ],
            2: [
                "It had potential, but it didn't deliver.",
                "The plot had some interesting moments, but overall, it fell flat.",
                "Not terrible, but I wouldn't recommend it.",
                "Somewhat interesting in parts, but overall disappointing.",
                "Mediocre at best. There are better options out there.",
                "It felt incomplete and lacking in substantial detail.",
                "The writing style was not to my liking, though the concept was decent.",
                "Could have been a lot better with more development.",
                "Struggles to maintain interest with its slow pacing.",
                "I found some parts okay, but overall it was underwhelming.",
                "Not particularly memorable or compelling.",
                "An okay read if you have nothing else on your list.",
                "The characters didn't evolve much and were somewhat predictable.",
                "Fails to excite or provide new insights.",
                "Lacks the punch that would make it stand out.",
                "Too many plot holes and unresolved questions.",
                "Not as bad as it could have been, but still not good.",
                "I had higher expectations that were not met.",
                "A bit of a letdown given the intriguing synopsis.",
                "More frustrating than enjoyable."
            ],
            3: [
                "A decent read, but nothing spectacular.",
                "Average in every way; it's neither good nor bad.",
                "Perfectly fine, but won't make it to my favorites list.",
                "Entertaining enough to pass the time, but not particularly memorable.",
                "Has its moments, but overall it's just okay.",
                "Good in parts, but overall lacks consistency.",
                "An enjoyable enough read, but could use more depth.",
                "Not outstanding, but not terrible either.",
                "Middle of the road - enjoyable but not impactful.",
                "Satisfactory for a one-time read.",
                "Neither disappointing nor exciting; it's moderately good.",
                "Well-paced, but the plot could be more engaging.",
                "It's okay; a standard book with a predictable plot.",
                "Not bad, but not particularly engaging or thrilling.",
                "Decent and readable, but lacks a compelling hook.",
                "Pleasant but forgettable.",
                "Moderately entertaining with some good parts.",
                "Doesn't stand out in a crowd, but not a complete waste of time.",
                "Fairly average with some strengths and some weaknesses.",
                "Neither fully satisfying nor completely disappointing."
            ],
            4: [
                "Really enjoyed this book; it was quite engaging.",
                "Impressive and well-written, with only a few flaws.",
                "Very good; it kept me interested from start to finish.",
                "An enjoyable read with strong characters and a solid plot.",
                "Definitely recommend; it's a great book with minor issues.",
                "Engaging and compelling, though not without its faults.",
                "Surprisingly good; I had a hard time putting it down.",
                "Well-executed with an interesting narrative.",
                "Very entertaining and well worth the read.",
                "Strongly liked it; the storyline was captivating.",
                "A very solid book, nearly perfect in its delivery.",
                "Captures the imagination and holds attention well.",
                "Delivers a satisfying read with much to admire.",
                "Very compelling with rich detail and complex characters.",
                "An absorbing read that I would recommend to most.",
                "Engrossing plot and well-developed characters.",
                "Quite impressive and better than expected.",
                "A good book that approaches excellence.",
                "Thoroughly enjoyable with a few minor critiques.",
                "Strong and memorable, a delightful read overall."
            ],
            5: [
                "Absolutely loved it! A masterpiece that I'll recommend to everyone.",
                "A phenomenal read that exceeded all my expectations!",
                "This book is a gem, truly exceptional in every way!",
                "Utterly captivating from the first page to the last.",
                "An outstanding achievement in literature. Brilliant!",
                "Exceptional writing and storytelling. It's a must-read.",
                "It's rare to find a book so fulfilling and rewarding.",
                "Perfect in every way; it has profoundly moved me.",
                "This is one of the best books I have ever read!",
                "Unforgettable and life-changing. A true work of art.",
                "Marvelous! It touched my heart deeply.",
                "Stunningly beautiful writing. I was completely engrossed.",
                "A triumph of creativity and expression!",
                "An absolute joy to read. I'm so glad I discovered this.",
                "Breathtaking in its scope and execution.",
                "So powerful and emotive; it left me speechless.",
                "Incredibly moving and beautifully crafted.",
                "A true classic that will stand the test of time.",
                "Masterfully written, with depth and sophistication.",
                "An epic journey that was a pleasure from start to finish."
            ]
        }
        ratings_weights = {1: 0.05, 2: 0.1, 3: 0.15, 4: 0.3, 5: 0.4}  # Use your previous settings to ensure average between 3.9 and 5
        for book in books:
            score = random.choices(population=[1, 2, 3, 4, 5], weights=ratings_weights, k=1)[0]
            comment = random.choice(comment_options[score])
            Review.objects.create(user=user_profile, book=book, rating=score, comment=comment)
