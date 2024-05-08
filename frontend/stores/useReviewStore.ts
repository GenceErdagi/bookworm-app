// stores/useReviewStore.ts
import { create } from 'zustand';
import { ReviewService } from '@/services/concrete/ReviewService';
import { IReviewService } from '@/services/abstract/IReviewService';
import Review from '@/types/Review';

interface ReviewState {
	reviews: Review[];
	fetchReviews: () => Promise<void>;
	fetchReviewById: (id: number) => Promise<void>;
	createReview: (reviewData: Partial<Review>) => Promise<void>;
	updateReview: (id: number, reviewData: Partial<Review>) => Promise<void>;
	deleteReview: (id: number) => Promise<void>;
}

const reviewService: IReviewService = new ReviewService();

export const useReviewStore = create<ReviewState>((set, get) => ({
	reviews: [],

	fetchReviews: async () => {
		const reviews = await reviewService.getReviews();
		set({ reviews });
	},

	fetchReviewById: async (id: number) => {
		const review = await reviewService.getReviewById(id);
		set({ reviews: [...get().reviews.filter((r) => r.id !== id), review] });
	},

	createReview: async (reviewData: Partial<Review>) => {
		const newReview = await reviewService.createReview(reviewData);
		set({ reviews: [...get().reviews, newReview] });
	},

	updateReview: async (id: number, reviewData: Partial<Review>) => {
		const updatedReview = await reviewService.updateReview(id, reviewData);
		set({
			reviews: get().reviews.map((review) =>
				review.id === id ? updatedReview : review
			)
		});
	},

	deleteReview: async (id: number) => {
		await reviewService.deleteReview(id);
		set({ reviews: get().reviews.filter((review) => review.id !== id) });
	}
}));
