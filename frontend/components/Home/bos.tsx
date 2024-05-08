/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pUg7NFTI93A
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from 'next/link';
import StarIcon from '../ui/star-icon';

export default function Component() {
	return (
		<section className='w-full pt-12 md:pt-24 lg:pt-32'>
			<div className='container grid gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16 xl:gap-24'>
				<div className='flex flex-col items-start space-y-6'>
					<img
						alt='Book Cover'
						className='aspect-[2/3] w-full max-w-[300px] rounded-lg object-cover'
						height={600}
						src='/placeholder.svg'
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
				<div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8'>
					<div className='group overflow-hidden rounded-lg border transition-all hover:shadow-lg dark:border-gray-800'>
						<Link
							className='block'
							href='#'
						>
							<img
								alt='Book Cover'
								className='aspect-[2/3] w-full object-cover transition-all group-hover:scale-105'
								height={450}
								src='/placeholder.svg'
								width={300}
							/>
							<div className='p-4'>
								<h3 className='text-lg font-semibold line-clamp-2'>
									The Kite Runner
								</h3>
								<div className='mt-2 flex items-center gap-1'>
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
									<span className='ml-1 text-sm font-medium'>4.2</span>
								</div>
							</div>
						</Link>
					</div>
					<div className='group overflow-hidden rounded-lg border transition-all hover:shadow-lg dark:border-gray-800'>
						<Link
							className='block'
							href='#'
						>
							<img
								alt='Book Cover'
								className='aspect-[2/3] w-full object-cover transition-all group-hover:scale-105'
								height={450}
								src='/placeholder.svg'
								width={300}
							/>
							<div className='p-4'>
								<h3 className='text-lg font-semibold line-clamp-2'>
									The Great Gatsby
								</h3>
								<div className='mt-2 flex items-center gap-1'>
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
									<span className='ml-1 text-sm font-medium'>4.4</span>
								</div>
							</div>
						</Link>
					</div>
					<div className='group overflow-hidden rounded-lg border transition-all hover:shadow-lg dark:border-gray-800'>
						<Link
							className='block'
							href='#'
						>
							<img
								alt='Book Cover'
								className='aspect-[2/3] w-full object-cover transition-all group-hover:scale-105'
								height={450}
								src='/placeholder.svg'
								width={300}
							/>
							<div className='p-4'>
								<h3 className='text-lg font-semibold line-clamp-2'>
									To Kill a Mockingbird
								</h3>
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
					<div className='group overflow-hidden rounded-lg border transition-all hover:shadow-lg dark:border-gray-800'>
						<Link
							className='block'
							href='#'
						>
							<img
								alt='Book Cover'
								className='aspect-[2/3] w-full object-cover transition-all group-hover:scale-105'
								height={450}
								src='/placeholder.svg'
								width={300}
							/>
							<div className='p-4'>
								<h3 className='text-lg font-semibold line-clamp-2'>
									The Catcher in the Rye
								</h3>
								<div className='mt-2 flex items-center gap-1'>
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
									<StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
									<span className='ml-1 text-sm font-medium'>3.5</span>
								</div>
							</div>
						</Link>
					</div>
					<div className='group overflow-hidden rounded-lg border transition-all hover:shadow-lg dark:border-gray-800'>
						<Link
							className='block'
							href='#'
						>
							<img
								alt='Book Cover'
								className='aspect-[2/3] w-full object-cover transition-all group-hover:scale-105'
								height={450}
								src='/placeholder.svg'
								width={300}
							/>
							<div className='p-4'>
								<h3 className='text-lg font-semibold line-clamp-2'>
									The Hunger Games
								</h3>
								<div className='mt-2 flex items-center gap-1'>
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-primary' />
									<StarIcon className='h-5 w-5 fill-muted stroke-muted-foreground' />
									<span className='ml-1 text-sm font-medium'>4.3</span>
								</div>
							</div>
						</Link>
					</div>
					<div className='group overflow-hidden rounded-lg border transition-all hover:shadow-lg dark:border-gray-800'>
						<Link
							className='block'
							href='#'
						>
							<img
								alt='Book Cover'
								className='aspect-[2/3] w-full object-cover transition-all group-hover:scale-105'
								height={450}
								src='/placeholder.svg'
								width={300}
							/>
							<div className='p-4'>
								<h3 className='text-lg font-semibold line-clamp-2'>
									The Book Thief
								</h3>
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
				</div>
			</div>
		</section>
	);
}
