/* eslint-disable @next/next/no-img-element */
import Book from '@/types/Book';
import { StarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { FC } from 'react';
import { MEDIA_URL } from '@/lib/api';
import { Button } from './button';
import Image from 'next/image';
import Rating from './Rating';
interface BookCardProps {
	book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
	return (
		<div className='group overflow-hidden rounded-lg border transition-all hover:shadow-lg dark:border-gray-800'>
			<Link
				className='block'
				href={`/books/${book.id}`}
			>
				{/*TODO:Migrate to next/image*/}
				<img
					alt='Book Cover'
					className='h-[400px] object-cover aspect-[3/4] w-full transition-all group-hover:scale-105'
					height={400}
					src={`http://127.0.0.1:8000/${book.cover_image}`}
					width={300}
				/>
				<div className=''>
					<div className='p-4'>
						<h3 className='text-lg font-semibold '>{book.title}</h3>
						<p className='text-gray-500 dark:text-gray-400 mb-2'>
							{book.author}
						</p>
						{
							//TODO: Add Fix Rating
						}
						<Rating rating={4.5} />
						<div className='flex  flex-wrap gap-4 mt-4 mb-2'>
							{book.genres.map((genre, i) => (
								<span
									key={i}
									className='bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md text-xs'
								>
									{genre.name}
								</span>
							))}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default BookCard;
