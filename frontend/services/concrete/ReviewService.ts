// services/concrete/ReviewService.ts
import { injectable } from 'tsyringe';
import IReviewService from '@/services/abstract/IReviewService';
import Review from '@/types/Review';
import fetchAPI from '@/lib/api';

@injectable()
export default class ReviewService implements IReviewService {
	async getReviewsByUser(userId: number): Promise<Review[]> {
		return fetchAPI(`reviews/?user_id=${userId}`);
	}

	async getReviewsByBook(bookId: number): Promise<Review[]> {
		return fetchAPI(`reviews/?book_id=${bookId}`);
	}

	async getReviews(): Promise<Review[]> {
		return fetchAPI('reviews/');
	}

	async getReviewById(id: number): Promise<Review> {
		return fetchAPI(`reviews/${id}/`);
	}

	async createReview(data: Partial<Review>): Promise<Review> {
		return fetchAPI('reviews/create/', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	async updateReview(id: number, data: Partial<Review>): Promise<Review> {
		return fetchAPI(`reviews/${id}/update/`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
	}

	async deleteReview(id: number): Promise<void> {
		await fetchAPI(`reviews/${id}/delete/`, { method: 'DELETE' });
	}
}
