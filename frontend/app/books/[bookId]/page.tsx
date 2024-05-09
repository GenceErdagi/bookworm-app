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
import { set } from 'react-hook-form';
import Review from '@/types/Review';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
	const params = useParams<{ bookId: string }>();
	const [book, setBook] = useState<Book>();
	const [reviews, setReviews] = useState<Review[]>();
	const bookService = ServiceContainer.getInstance().getBookService();
	const reviewService = ServiceContainer.getInstance().getReviewService();

	useEffect(() => {
		const fetchData = async () => {
			const book = await bookService.getBookById(parseInt(params.bookId));
			const reviews = await reviewService.getReviewsByBook(
				parseInt(params.bookId)
			);
			setBook(book);
			setReviews(reviews);
		};
		fetchData();
	}, [bookService, reviewService, params.bookId]);
	return (
		<>
			<div className='grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6'>
				<div className='grid gap-4 md:gap-10 items-start'>
					<img
						alt='Book Cover'
						className='aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800'
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
							<div className='flex items-center gap-0.5'>
								<StarIcon className='w-5 h-5 fill-primary' />
								<StarIcon className='w-5 h-5 fill-primary' />
								<StarIcon className='w-5 h-5 fill-primary' />
								<StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
								<StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
							</div>
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
				</div>
			</div>
			<div className='mx-auto px-4 md:px-6 max-w-2xl grid gap-12'>
				<div className='grid gap-4'>
					<h2 className='text-2xl font-bold'>Reviews</h2>
					{reviews?.map((review) => (
						<>
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
											<h3 className='font-semibold'>{review.user.username}</h3>
											<div className='flex items-center gap-0.5'>
												<StarIcon className='w-5 h-5 fill-primary' />
												<StarIcon className='w-5 h-5 fill-primary' />
												<StarIcon className='w-5 h-5 fill-primary' />
												<StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
												<StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
											</div>
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
						</>
					))}
				</div>
				<div className='grid gap-4 mb-4'>
					<h2 className='text-2xl font-bold'>Add a Review</h2>
					<form className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								placeholder='Enter your name'
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='rating'>Rating</Label>
							<RadioGroup
								defaultValue='4'
								id='rating'
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
							/>
						</div>
						<Button type='submit'>Submit Review</Button>
					</form>
				</div>
			</div>
		</>
	);
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
