import ServiceContainer from '@/services/concrete/ServiceContainer';
import React, { FC } from 'react';
import Hero from './Hero';
import Carousel from './Carousel';
import BookList from './BookList';

interface MainPageProps {}
const MainPage: FC<MainPageProps> = async ({}) => {
	const bookService = ServiceContainer.getInstance().getBookService();
	const books = await bookService.getBooks();
	const randomBook = books[Math.floor(Math.random() * books.length)];
	const temp = Math.floor(Math.random() * books.length);
	const carouselBooks = books.slice(temp, temp + 8);
	const listBooks = books.slice(temp + 9, temp + 17);

	return (
		<div className='flex-1'>
			<Hero book={randomBook} />
			<Carousel books={carouselBooks} />
			<BookList books={listBooks} />
		</div>
	);
};

export default MainPage;
