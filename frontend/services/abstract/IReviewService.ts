// services/abstract/IReviewService.ts
import Review from '@/types/Review';

export interface IReviewService {
	getReviews(): Promise<Review[]>;
	getReviewById(id: number): Promise<Review>;
	createReview(data: Partial<Review>): Promise<Review>;
	updateReview(id: number, data: Partial<Review>): Promise<Review>;
	deleteReview(id: number): Promise<void>;
}
