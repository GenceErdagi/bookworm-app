'use client';
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
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

const Page = () => {
	const router = useRouter();
	const { login } = useAuth();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			await login(username, password);
			router.push('/');
		} catch (error) {
			console.error('Failed to login:', error);
		}
	};

	return (
		<div className='mt-10 flex-grow mb-10'>
			<Card className='max-w-2xl mx-auto'>
				<CardHeader>
					<CardTitle>Admin User Management</CardTitle>
					<CardDescription>
						Enter user details to create a new user
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
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
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								placeholder='johndoe@example.com'
								required
								type='email'
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
/*		<form onSubmit={handleLogin}>
			<input
				type='text'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder='Username'
			/>
			<input
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<button type='submit'>Log In</button>
		</form>
  <div className='grid grid-cols-2 gap-4'>

<div className='space-y-2'>
  <Label htmlFor='first-name'>First name</Label>
  <Input
    id='first-name'
    placeholder='John'
    required
  />
</div>
<div className='space-y-2'>
  <Label htmlFor='last-name'>Last name</Label>
  <Input
    id='last-name'
    placeholder='Doe'
    required
  />
</div>
</div>
    
    */
