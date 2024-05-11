/* eslint-disable @next/next/no-img-element */
import { MEDIA_URL } from '@/lib/api';
import Book from '@/types/Book';
import Link from 'next/link';

export default function Hero({ book }: { book: Book }) {
	return (
		<section className='w-full pb-12 md:pb-24 lg:pb-32'>
			<div className='container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12'>
				<div className='flex flex-col items-start justify-center space-y-4'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
							Discover Your Next Great Read
						</h1>
						<p className='max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
							Explore our curated collection of books and discover your next
							literary adventure.
						</p>
						<p className='text-xl font-bold md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
							{book.title} by {book.author}
						</p>
					</div>
					<div className='flex flex-col gap-2 min-[400px]:flex-row'>
						<Link
							className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
							href='/books'
						>
							Browse
						</Link>
						<Link
							className='inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
							href='/auth/register'
						>
							Sign Up
						</Link>
					</div>
				</div>
				<Link href={`/books/${book.id}`}>
					{/*TODO:Migrate to next/image*/}
					<img
						alt='Book Cover'
						className='mx-auto aspect-square object-contain overflow-hidden rounded-xl sm:w-full h- lg:order-last hover:cursor-pointer'
						height='550'
						src={`http://127.0.0.1:8000/${book.cover_image}`}
						width='550'
					/>
				</Link>
			</div>
		</section>
	);
}
//
