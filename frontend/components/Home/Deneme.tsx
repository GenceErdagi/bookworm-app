'use client';
import React, { useEffect } from 'react';
import { useBookStore } from '@/stores/useBookStore';
import { useGenreStore } from '@/stores/useGenreStore';
import { useReviewStore } from '@/stores/useReviewStore';

const Deneme = () => {
	const { books, fetchBooks } = useBookStore();
	const { genres, fetchGenres } = useGenreStore();
	const { reviews, fetchReviews } = useReviewStore();

	useEffect(() => {
		fetchBooks();
		fetchGenres();
		fetchReviews();
	}, [fetchBooks, fetchGenres, fetchReviews]);

	return (
		<div>
			<h2>Books</h2>
			<ul>
				{books.map((book) => (
					<li key={book.id}>{book.title}</li>
				))}
			</ul>

			<h2>Genres</h2>
			<ul>
				{genres.map((genre) => (
					<li key={genre.id}>{genre.name}</li>
				))}
			</ul>
			<h2>Reviews</h2>
			<ul>
				{reviews.map((review) => (
					<li key={review.id}>
						{review.comment} (Rating: {review.rating})
					</li>
				))}
			</ul>
		</div>
	);
};

export default Deneme;
