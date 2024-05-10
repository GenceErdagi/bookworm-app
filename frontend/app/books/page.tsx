'use client';

import { FC, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ServiceContainer from '@/services/concrete/ServiceContainer';
import BookCard from '@/components/ui/bookCard';
import Book from '@/types/Book';
import Genre from '@/types/Genre';
import { set } from 'react-hook-form';
import { Button } from '@/components/ui/button';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
	const [loading, setLoading] = useState(true);
	const bookService = ServiceContainer.getInstance().getBookService();
	const genreService = ServiceContainer.getInstance().getGenreService();
	const [books, setBooks] = useState<Book[]>();
	const [genres, setGenres] = useState<Genre[]>();
	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
	const [search, setSearch] = useState<string>('');
	const [searchedBooks, setSearchedBooks] = useState<Book[]>();

	useEffect(() => {
		const fetchData = async () => {
			const books = await bookService.getBooks();
			const genres = await genreService.getGenres();
			setBooks(books);
			setSearchedBooks(books);
			setGenres(genres);
		};
		fetchData();
		setLoading(false);
	}, [bookService, genreService]);
	if (loading) {
		return (
			<div className='w-screen h-screen flex justify-center items-center'>
				<p>Loading...</p>
			</div>
		);
	} else {
		return (
			<div className='container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8 px-4'>
				<div className=''>
					<div className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg '>
						<h2 className='text-lg font-semibold mb-4'>Filters</h2>
						<div className='space-y-4'>
							<div>
								<h3 className='text-base font-medium mb-2'>Genre</h3>
								<div className='space-y-2'>
									{genres &&
										genres.map((genre) => (
											<div
												key={genre.id}
												className='flex items-center gap-2'
											>
												<div>
													<Checkbox
														id={`${genre.id}`}
														checked={selectedGenres.includes(genre.id)}
														onClick={(e) => {
															setSelectedGenres((prev) => {
																if (prev.includes(genre.id)) {
																	return prev.filter((id) => id !== genre.id);
																}
																return [...prev, genre.id];
															});
														}}
													/>
													<Label
														className='text-base font-normal ml-2'
														htmlFor={`genre-${genre.id}`}
													>
														{genre.name}
													</Label>
												</div>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className='mb-6 flex w-full items-center space-x-2'>
						<Input
							className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
							placeholder='Search books...'
							type='search'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Button
							type='submit'
							onClick={() => {
								if (search === '') {
									setSearchedBooks(books);
									return;
								}
								const searched_books = books?.filter(
									(book) =>
										book.title.toLowerCase().includes(search.toLowerCase()) ||
										book.author.toLowerCase().includes(search.toLowerCase())
								);
								console.log(searched_books);
								setSearchedBooks(searched_books);
							}}
						>
							Search
						</Button>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{selectedGenres.length === 0
							? searchedBooks?.map((book) => (
									<BookCard
										key={book.id}
										book={book}
									/>
							  ))
							: searchedBooks
									?.filter((book) =>
										book?.genres.some((genre) =>
											selectedGenres.includes(genre.id)
										)
									)
									.map((book) => (
										<BookCard
											key={book.id}
											book={book}
										/>
									))}
					</div>
				</div>
			</div>
		);
	}
};

export default Page;
