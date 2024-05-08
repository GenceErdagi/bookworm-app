// services/concrete/ReviewService.ts
import axios from 'axios';
import { IReviewService } from '@/services/abstract/IReviewService';
import Review from '@/types/Review';

export class ReviewService implements IReviewService {
	private apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`;

	async getReviews(): Promise<Review[]> {
		const response = await axios.get(this.apiUrl);
		return response.data;
	}

	async getReviewById(id: number): Promise<Review> {
		const response = await axios.get(`${this.apiUrl}/${id}`);
		return response.data;
	}

	async createReview(data: Partial<Review>): Promise<Review> {
		const response = await axios.post(this.apiUrl, data);
		return response.data;
	}

	async updateReview(id: number, data: Partial<Review>): Promise<Review> {
		const response = await axios.put(`${this.apiUrl}/${id}`, data);
		return response.data;
	}

	async deleteReview(id: number): Promise<void> {
		await axios.delete(`${this.apiUrl}/${id}`);
	}
}
