import React, { FC } from 'react';

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
				<div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'></div>
			</div>
		</section>
	);
};

export default Carousel;
