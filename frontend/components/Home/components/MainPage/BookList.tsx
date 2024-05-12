/* eslint-disable @next/next/no-img-element */
'use client';
import Rating from '@/components/ui/Rating';
import StarIcon from '@/components/ui/Rating';
import BookCard from '@/components/ui/bookCard';
import Book from '@/types/Book';
import Image from 'next/image';
import Link from 'next/link';

export default function Component({ books }: { books: Book[] }) {
	return (
		<section className='w-full pt-12 md:pt-24 lg:pt-32'>
			<div className='container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 xl:gap-24'>
				<div className='justify-self-center flex flex-col items-start space-y-6'>
					<div className='w-full h-96 md:h-96 lg:h-128'>
						{/*TODO:Migrate to next/image*/}
						<img
							alt='Book Cover'
							className='self-center object-contain h-full rounded-lg'
							src={`http://127.0.0.1:8000/${books[0].cover_image}`}
						/>
					</div>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
							{books[0].title}
						</h1>
						<p className='text-lg font-medium text-gray-500 dark:text-gray-400'>
							{books[0].author}
						</p>
						<div className='flex items-center gap-1'>
							{
								//TODO: Add Fix Rating
							}
							<Rating rating={4.5} />
							<span className='ml-2 text-lg font-medium'>4.5</span>
						</div>
					</div>
				</div>
				<div className='grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:gap-8'>
					{books.slice(1, 7).map((book) => (
						<BookCard
							key={book.id}
							book={book}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
