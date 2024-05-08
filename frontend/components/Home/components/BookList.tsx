'use client';
import StarIcon from '@/components/ui/star-icon';
import Image from 'next/image';
import { MEDIA_URL } from '@/lib/apiConfig';
import Book from '@/types/Book';
import BookCard from '@/components/ui/BookCard';

export default function Component() {
	return (
		<section className='w-full pt-12 md:pt-24 lg:pt-32'>
			<div className='container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 xl:gap-24'>
				<div className='flex flex-col items-start space-y-6'>
					<Image
						alt='Book Cover'
						className='aspect-[2/3] w-full max-w-[300px] rounded-lg object-cover'
						height={600}
						src={`${MEDIA_URL}/placeholder.svg`}
						width={400}
					/>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
							The Alchemist
						</h1>
						<p className='text-lg font-medium text-gray-500 dark:text-gray-400'>
							Paulo Coelho
						</p>
						<div className='flex items-center gap-1'>
							<StarIcon className='h-6 w-6 fill-primary' />
							<StarIcon className='h-6 w-6 fill-primary' />
							<StarIcon className='h-6 w-6 fill-primary' />
							<StarIcon className='h-6 w-6 fill-primary' />
							<StarIcon className='h-6 w-6 fill-muted stroke-muted-foreground' />
							<span className='ml-2 text-lg font-medium'>4.5</span>
						</div>
					</div>
				</div>
				<div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8'></div>
			</div>
		</section>
	);
}
