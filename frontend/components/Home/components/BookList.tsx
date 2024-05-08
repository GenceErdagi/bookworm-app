'use client';
import StarIcon from '@/components/ui/star-icon';
import Image from 'next/image';

export default function Component() {
	return (
		<section className='w-full pt-12 md:pt-24 lg:pt-32'>
			<div className='container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 xl:gap-24'>
				<div className='flex flex-col items-start space-y-6'>
					<div className='relative w-full h-96 md:h-96 lg:h-128'>
						<Image
							alt='Book Cover'
							className='object-cover rounded-lg'
							layout='fill'
							src='https://images.unsplash.com/photo-1612837087110-3b8b0c5b6b3b'
						/>
					</div>
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
