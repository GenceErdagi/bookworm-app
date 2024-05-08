/* eslint-disable @next/next/no-img-element */
import Book from '@/types/Book';
import { StarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { FC } from 'react';
import Image from 'next/image';
import { MEDIA_URL } from '@/lib/apiConfig';
interface BookCardProps {
	book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
	return (
		<div className='group overflow-hidden rounded-lg border transition-all hover:shadow-lg dark:border-gray-800'>
			<Link
				className='block'
				href='#'
			>
				<img
					alt='Book Cover'
					className='aspect-[3/4] w-full object-cover transition-all group-hover:scale-105'
					height={450}
					src={`${MEDIA_URL}${book.cover_image}`}
					width={300}
				/>
				<div className='p-4'>
					<h3 className='text-lg font-semibold line-clamp-2'>{book.title}</h3>
					<div className='mt-2 flex items-center gap-1'>
						<StarIcon className='h-5 w-5 fill-primary' />
						<StarIcon className='h-5 w-5 fill-primary' />
						<StarIcon className='h-5 w-5 fill-primary' />
						<StarIcon className='h-5 w-5 fill-primary' />
						<StarIcon className='h-5 w-5 fill-primary' />
						<span className='ml-1 text-sm font-medium'>5.0</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default BookCard;
