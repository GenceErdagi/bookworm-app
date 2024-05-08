// services/ServiceContainer.ts
import 'reflect-metadata';
import IBookService from '@/services/abstract/IBookService';
import IUserService from '@/services/abstract/IUserService';
import IGenreService from '@/services/abstract/IGenreService';
import IReviewService from '@/services/abstract/IReviewService';
import BookService from '@/services/concrete/BookService';
import UserService from '@/services/concrete/UserService';
import GenreService from '@/services/concrete/GenreService';
import ReviewService from '@/services/concrete/ReviewService';

class ServiceContainer {
	private static instance: ServiceContainer;
	private bookService: IBookService;
	private userService: IUserService;
	private genreService: IGenreService;
	private reviewService: IReviewService;

	private constructor() {
		this.bookService = new BookService();
		this.userService = new UserService();
		this.genreService = new GenreService();
		this.reviewService = new ReviewService();
	}

	public static getInstance(): ServiceContainer {
		if (!ServiceContainer.instance) {
			ServiceContainer.instance = new ServiceContainer();
		}
		return ServiceContainer.instance;
	}

	public getBookService(): IBookService {
		return this.bookService;
	}

	public getUserService(): IUserService {
		return this.userService;
	}

	public getGenreService(): IGenreService {
		return this.genreService;
	}

	public getReviewService(): IReviewService {
		return this.reviewService;
	}
}

export default ServiceContainer;
