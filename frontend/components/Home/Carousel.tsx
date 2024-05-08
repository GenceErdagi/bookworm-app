import React, { FC } from 'react';
import StarIcon from '../ui/star-icon';

interface CarouselProps {}

const Carousel: FC<CarouselProps> = ({}) => {
	return (
		<section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-center space-y-4 text-center'>
					<div className='space-y-2'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
							Featured Books
						</h2>
						<p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
							Discover our curated selection of the best books across various
							genres.
						</p>
					</div>
				</div>
				<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					<div className='group flex flex-col items-start rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800'>
						<img
							alt='Book Cover'
							className='mb-4 aspect-[2/3] w-full rounded-lg object-cover'
							height='450'
							src='/placeholder.svg'
							width='300'
						/>
						<div className='flex flex-col items-start space-y-2'>
							<h3 className='text-lg font-bold'>The Great Gatsby</h3>
							<p className='text-gray-500 dark:text-gray-400'>
								F. Scott Fitzgerald
							</p>
							<div className='flex items-center gap-0.5 text-yellow-500'>
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
							</div>
						</div>
					</div>
					<div className='group flex flex-col items-start rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800'>
						<img
							alt='Book Cover'
							className='mb-4 aspect-[2/3] w-full rounded-lg object-cover'
							height='450'
							src='/placeholder.svg'
							width='300'
						/>
						<div className='flex flex-col items-start space-y-2'>
							<h3 className='text-lg font-bold'>To Kill a Mockingbird</h3>
							<p className='text-gray-500 dark:text-gray-400'>Harper Lee</p>
							<div className='flex items-center gap-0.5 text-yellow-500'>
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
							</div>
						</div>
					</div>
					<div className='group flex flex-col items-start rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800'>
						<img
							alt='Book Cover'
							className='mb-4 aspect-[2/3] w-full rounded-lg object-cover'
							height='450'
							src='/placeholder.svg'
							width='300'
						/>
						<div className='flex flex-col items-start space-y-2'>
							<h3 className='text-lg font-bold'>1984</h3>
							<p className='text-gray-500 dark:text-gray-400'>George Orwell</p>
							<div className='flex items-center gap-0.5 text-yellow-500'>
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
							</div>
						</div>
					</div>
					<div className='group flex flex-col items-start rounded-lg bg-white p-4 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-800'>
						<img
							alt='Book Cover'
							className='mb-4 aspect-[2/3] w-full rounded-lg object-cover'
							height='450'
							src='/placeholder.svg'
							width='300'
						/>
						<div className='flex flex-col items-start space-y-2'>
							<h3 className='text-lg font-bold'>Pride and Prejudice</h3>
							<p className='text-gray-500 dark:text-gray-400'>Jane Austen</p>
							<div className='flex items-center gap-0.5 text-yellow-500'>
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
								<StarIcon className='h-5 w-5' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Carousel;
