import React, { FC, HTMLAttributes, SVGAttributes } from 'react';

interface RatingProps extends HTMLAttributes<HTMLDivElement> {
	rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
	return (
		<div className='flex items-center gap-0.5'>
			{[1, 2, 3, 4, 5].map((i) => (
				<svg
					key={i}
					className={`w-5 h-5 ${
						i > rating ? 'fill-muted' : 'fill-primary'
					} stroke-muted-foreground`}
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
				</svg>
			))}
		</div>
	);
};

export default Rating;
