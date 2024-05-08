import React, { FC } from 'react';
import ServiceContainer from '@/services/concrete/ServiceContainer';

const bookService = ServiceContainer.getInstance().getBookService();
const reviewService = ServiceContainer.getInstance().getReviewService();

interface MainPageProps {}

const MainPage: FC<MainPageProps> = async ({}) => {
	const reviews = await reviewService.getReviewsByBook(24);
	const book = await bookService.getBookById(24);
	return (
		<div className='flex-1'>
			{book.title}

			{reviews.map((review, i) => (
				<p key={i}>{review.comment + ' ' + review.rating}</p>
			))}
		</div>
	);
};

export default MainPage;
