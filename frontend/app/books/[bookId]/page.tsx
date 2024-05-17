'use client';
/* eslint-disable @next/next/no-img-element */
import { Badge } from '@/components/ui/badge';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FC, useEffect, useState } from 'react';
import Book from '@/types/Book';
import { MEDIA_URL } from '@/lib/api';
import ServiceContainer from '@/services/concrete/ServiceContainer';
import { useParams } from 'next/navigation';
import Review from '@/types/Review';
import Rating from '@/components/ui/Rating';
import User from '@/types/User';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { set } from 'react-hook-form';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
	const [loading, setLoading] = useState(true);
	const [userComment, setUserComment] = useState('');
	const [userRating, setUserRating] = useState(3);
	const router = useRouter();
	const params = useParams<{ bookId: string }>();
	const [book, setBook] = useState<Book>();
	const [reviews, setReviews] = useState<Review[]>();
	const [users, setUsers] = useState<User[]>();
	const bookService = ServiceContainer.getInstance().getBookService();
	const reviewService = ServiceContainer.getInstance().getReviewService();
	const userService = ServiceContainer.getInstance().getUserService();
	const { user } = useAuth();
	const handleSubmit = async (e: any) => {
		e.preventDefault();

		await reviewService.createReview({
			book: parseInt(params.bookId),
			user: user?.id,
			rating: userRating,
			comment: userComment
		});
		const reviews = await reviewService.getReviewsByBook(
			parseInt(params.bookId)
		);
		setReviews(reviews);
		setUserComment('');
		router.refresh();
	};
	useEffect(() => {
		const fetchData = async () => {
			const book = await bookService.getBookById(parseInt(params.bookId));
			const reviews = await reviewService.getReviewsByBook(
				parseInt(params.bookId)
			);
			const ids = reviews.map((review) => review.user);
			const users = await userService.getUsers();
			const filteredUsers = users.filter((user) => ids.includes(user.id));

			setBook(book);
			setReviews(reviews);
			setUsers(filteredUsers);
			setLoading(false);
		};
		fetchData();
	}, [bookService, reviewService, userService, params.bookId]);

	if (loading) {
		return (
			<div className='w-screen h-screen flex justify-center items-center'>
				<p>Loading...</p>
			</div>
		);
	} else {
		return (
			<>
				<div className='grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6'>
					<div className='grid gap-4 md:gap-10 items-start'>
						{/*TODO:Migrate to next/image*/}
						<img
							alt='Book Cover'
							className='aspect-[2/3] object-contain border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
							height={600}
							src={`${MEDIA_URL}${book?.cover_image}`}
							width={400}
						/>
					</div>
					<div className='grid gap-4 md:gap-10 items-start'>
						<div className='grid gap-2'>
							<h1 className='text-3xl font-bold'>{book?.title}</h1>
							<div className='flex items-center gap-4'>
								<p className='text-gray-500 dark:text-gray-400'>
									By {book?.author}
								</p>
								<Rating rating={4} />
							</div>
						</div>
						<div className='grid gap-2'>
							<p className='text-gray-500 dark:text-gray-400'>
								ISBN: {book?.isbn}
							</p>
							<p className='text-gray-500 dark:text-gray-400'>
								Publication Date: {book?.publication_date}
							</p>
						</div>
						<div className='grid gap-2'>
							<h2 className='text-xl font-bold'>Description</h2>
							<p className='text-gray-500 dark:text-gray-400'>
								{book?.description}
							</p>
						</div>
						<div className='grid gap-2'>
							<h2 className='text-xl font-bold'>Genres</h2>
							<div className='flex flex-wrap gap-2'>
								{book?.genres.map((genre) => (
									<Badge key={genre.id}>{genre.name}</Badge>
								))}
							</div>
						</div>
						{user ? (
							<div className='grid gap-2'>
								<div className='flex flex-wrap gap-2'>
									<Button
										variant={'destructive'}
										onClick={() => {
											//TODO: Add to wishlist
										}}
									>
										Add to Wishlist
									</Button>
								</div>
							</div>
						) : null}
					</div>
				</div>
				<div className='mx-auto px-4 md:px-6 max-w-2xl grid gap-12'>
					<div className='grid gap-4'>
						<h2 className='text-2xl font-bold'>Reviews</h2>
						{reviews?.map((review) => (
							<div key={review.id}>
								<div className='flex gap-4'>
									<Avatar className='w-10 h-10 border'>
										<AvatarImage
											alt='@shadcn'
											src='/placeholder-user.jpg'
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className='grid gap-4 w-full'>
										<div className='flex gap-4 items-start'>
											<div className='grid gap-0.5 text-sm'>
												<h3 className='font-bold'>
													{
														users?.find((user) => user.id == review.user)
															?.username
													}
												</h3>
												<Rating rating={review.rating} />
											</div>
											<time className='text-sm text-gray-500 dark:text-gray-400 ml-auto'>
												{/*TODO:Add creaeted at support*/}2 days ago
											</time>
										</div>
										<div className='text-sm leading-loose text-gray-500 dark:text-gray-400'>
											<p>{review.comment}</p>
										</div>
									</div>
								</div>
								<Separator />
							</div>
						))}
					</div>
					{user ? (
						<div className='grid gap-4 mb-4'>
							<h2 className='text-2xl font-bold'>Add a Review</h2>
							<form className='grid gap-4'>
								<div className='grid gap-2'>
									<p className='text-primary text-xl'>{user?.username}</p>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='rating'>Rating</Label>
									<RadioGroup
										defaultValue='3'
										id='rating'
										onValueChange={(e) => {
											setUserRating(parseInt(e));
										}}
									>
										<div className='flex items-center gap-2'>
											<RadioGroupItem
												id='rating-1'
												value='1'
											/>
											<StarIcon className='w-5 h-5 fill-primary' />
										</div>
										<div className='flex items-center gap-2'>
											<RadioGroupItem
												id='rating-2'
												value='2'
											/>
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
										</div>
										<div className='flex items-center gap-2'>
											<RadioGroupItem
												id='rating-3'
												value='3'
											/>
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
										</div>
										<div className='flex items-center gap-2'>
											<RadioGroupItem
												id='rating-4'
												value='4'
											/>
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
										</div>
										<div className='flex items-center gap-2'>
											<RadioGroupItem
												id='rating-5'
												value='5'
											/>
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
											<StarIcon className='w-5 h-5 fill-primary' />
										</div>
									</RadioGroup>
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='review'>Review</Label>
									<Textarea
										className='min-h-[150px]'
										id='review'
										placeholder='Write your review'
										onChange={(e) => {
											setUserComment(e.target.value);
										}}
									/>
								</div>
								<Button onClick={handleSubmit}>Submit Review</Button>
							</form>
						</div>
					) : (
						<div className='grid gap-4 mb-8'>
							<h2 className='text-2xl font-bold'>Add a Review</h2>
							<p className='text-center text-primary text-2xl mb-4'>
								Please Sign Up or Sign in to make reviews about books
							</p>
							<div className='flex w-full justify-evenly gap-4'>
								<Button
									className='w-1/3 text-lg'
									variant='outline'
									onClick={() => {
										router.push('/auth/login');
									}}
								>
									Sign in
								</Button>
								<Button
									className='w-1/3 text-lg'
									onClick={() => {
										router.push('/auth/register');
									}}
								>
									Sign Up
								</Button>
							</div>
						</div>
					)}
				</div>
			</>
		);
	}
};

function StarIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
		</svg>
	);
}

export default Page;
