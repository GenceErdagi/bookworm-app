'use client';

/* eslint-disable @next/next/no-img-element */
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import {
	CarouselItem,
	CarouselContent,
	CarouselPrevious,
	CarouselNext,
	Carousel
} from '@/components/ui/carousel';
import { FC, useEffect, useState } from 'react';
import Rating from '@/components/ui/Rating';
import BookCard from '@/components/ui/bookCard';
import Book from '@/types/Book';
import User from '@/types/User';
import Review from '@/types/Review';
import ServiceContainer from '@/services/concrete/ServiceContainer';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
interface PageProps {
	params: { userId: string };
}
const Page: FC<PageProps> = ({ params }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User>();
	const [reviews, setReviews] = useState<Review[]>();

	const [reviewedBooks, setReviewedBooks] = useState<Book[]>();
	const [wishlistBooks, setWishlistBooks] = useState<Book[]>();
	console;
	const bookService = ServiceContainer.getInstance().getBookService();
	const reviewService = ServiceContainer.getInstance().getReviewService();
	const userService = ServiceContainer.getInstance().getUserService();

	useEffect(() => {
		const fetchData = async () => {
			const user = await userService.fetchUser(
				params.userId as unknown as number
			);
			const reviews = await reviewService.getReviewsByUser(user.id);
			const books = await bookService.getBooks();

			const reviewedBooks = reviews.map((review) => {
				const book = books.find((book) => book.id === review.book);
				return book;
			});

			const wishlistBooks = books.filter((book) =>
				user.wishlist.includes(book.id)
			);
			console.log(wishlistBooks);
			setUser(user);
			setReviews(reviews);
			setReviewedBooks(reviewedBooks as Book[]);
			setWishlistBooks(wishlistBooks);
			setLoading(false);
		};
		fetchData();
	}, [bookService, reviewService, userService, params.userId]);
	if (loading) {
		return (
			<div className='w-screen h-screen items-center justify-center'>
				<p>Loading...</p>
			</div>
		);
	}
	return (
		<div className='bg-gray-100 dark:bg-gray-900 py-12'>
			<div className='container mx-auto px-4 md:px-6'>
				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden'>
					<div className='p-6 md:p-8'>
						<div className='flex items-center space-x-4'>
							<Avatar className='w-16 h-16'>
								<AvatarImage
									alt='User Avatar'
									src='/placeholder-avatar.jpg'
								/>
								<AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<h1 className='text-2xl font-bold'>{user?.username}</h1>
							</div>
						</div>
					</div>
					<div className='border-t border-gray-200 dark:border-gray-700'>
						<div className='p-6 md:p-8'>
							<div className='md:p-12'>
								<Carousel className='w-full p-4 mb-4'>
									<CarouselContent>
										{wishlistBooks?.map((book) => (
											<CarouselItem
												className='md:basis-1/2 lg:basis-1/3'
												key={book.id}
											>
												<BookCard book={book} />
											</CarouselItem>
										))}
									</CarouselContent>
									<CarouselPrevious />
									<CarouselNext />
								</Carousel>
							</div>
							<div>
								<h2 className='text-xl font-bold mb-4'>Reviews</h2>
								<div className='space-y-4 mb-4'>
									{reviewedBooks?.map((book) => (
										<Link
											href={`/books/${book.id}`}
											key={book.id}
											className='flex space-x-4'
										>
											<img
												alt='Book Cover'
												className='rounded-lg'
												height={150}
												src={`http://127.0.0.1:8000/${book.cover_image}`}
												style={{
													aspectRatio: '100/150',
													objectFit: 'cover'
												}}
												width={100}
											/>
											<div className='flex-1'>
												<h3 className='text-base font-semibold'>
													{book.title}
												</h3>
												<div className='flex items-center space-x-2 mb-2'>
													<Rating
														rating={
															reviews?.find((review) => review.book === book.id)
																?.rating || 4
														}
													/>
												</div>
												<p className='text-gray-500 dark:text-gray-400'>
													{
														reviews?.find((review) => review.book === book.id)
															?.comment
													}
												</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Page;
