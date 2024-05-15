/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
	const router = useRouter();
	const { user } = useAuth();
	console.log(user);
	return (
		<nav className='inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90'>
			<div className='w-full max-w-7xl mx-auto px-4'>
				<div className='flex justify-between h-14 items-center'>
					<Link
						className='flex items-center'
						href='/'
					>
						<img
							src='/logo.svg'
							className='h-6 w-6'
							alt='Bookworm Logo'
						/>
						<span className=''>Bookworm</span>
					</Link>
					<nav className='hidden md:flex gap-4'>
						<Link
							className='font-medium flex items-center text-sm transition-colors hover:underline'
							href='/'
						>
							Home
						</Link>
						<Link
							className='font-medium flex items-center text-sm transition-colors hover:underline'
							href='/books'
						>
							Books
						</Link>
						<Link
							className='font-medium flex items-center text-sm transition-colors hover:underline'
							href='/users'
						>
							Users
						</Link>
					</nav>
					{user ? (
						<div className='flex items-center gap-4'>
							<Button
								size='sm'
								variant='default'
								onClick={() => {
									router.push('/auth/profile');
								}}
							>
								Profile
							</Button>
							<Button
								size='sm'
								variant='destructive'
								onClick={(e) => {
									e.preventDefault();
									router.push('/auth/logout');
								}}
							>
								Sign Out
							</Button>
						</div>
					) : (
						<div className='flex items-center gap-4'>
							<Button
								size='sm'
								variant='outline'
								onClick={() => {
									router.push('/auth/login');
								}}
							>
								Sign in
							</Button>
							<Button
								size='sm'
								onClick={() => {
									router.push('/auth/register');
								}}
							>
								Sign up
							</Button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
