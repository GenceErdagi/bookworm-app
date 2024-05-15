import React, { FC } from 'react';
import { Button } from '@/components/ui/button';
import User from '@/types/User';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserCardProps {
	user: User;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
	return (
		<div className='flex items-center justify-center'>
			<div className='rounded-lg shadow-lg w-64'>
				<div className='h-24 bg-primary rounded-t-lg' />

				<Avatar className='-mt-12 w-[100px] h-[100px] mx-auto'>
					<AvatarImage
						alt='User Avatar'
						src='/placeholder-avatar.jpg'
					/>
					<AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
				</Avatar>

				<div className='text-center mt-2'>
					<h2 className='text-lg font-semibold'>{user.username}</h2>
					<p className='text-gray-500'>{user.email}</p>
				</div>
				<div className='flex justify-around my-4'>
					<div className='text-center'>
						<h3 className='font-semibold text-lg'>{user.wishlist.length}</h3>
						<p className='text-gray-500'>Wishlist</p>
					</div>
				</div>
				<div className='px-6 py-4'>
					<Link href={`/users/${user.id}`}>
						<Button className='w-full bg-primary text-white rounded-lg'>
							View Profile
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
