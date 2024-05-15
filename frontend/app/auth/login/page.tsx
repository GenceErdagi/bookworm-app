'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const Page = () => {
	const router = useRouter();
	const { login } = useAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		await login(username, password);
		alert('Logged in');
		router.push('/auth/profile');
	};

	return (
		<div className='mt-10   h-screen items-center justify-center mb-10 px-4'>
			<Card className='max-w-2xl mx-auto'>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Enter user details to sign in</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4 '>
						<div className='space-y-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								placeholder='Username'
								required
								type='username'
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
						</div>

						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input
								id='password'
								required
								type='password'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						className='w-full'
						type='submit'
						onClick={handleLogin}
					>
						Login
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Page;
