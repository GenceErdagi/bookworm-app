'use client';

import { FC, useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import ServiceContainer from '@/services/concrete/ServiceContainer';
import { Button } from '@/components/ui/button';
import User from '@/types/User';
import UserCard from '@/components/ui/userCard';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
	const [loading, setLoading] = useState(true);
	const userService = ServiceContainer.getInstance().getUserService();
	const [users, setUsers] = useState<User[]>();
	const [search, setSearch] = useState<string>('');
	const [searchedUsers, setSearchedUsers] = useState<User[]>();
	userService;
	useEffect(() => {
		const fetchData = async () => {
			const users = await userService.getUsers();
			setUsers(users);
			setSearchedUsers(users);
		};
		fetchData();
		setLoading(false);
	}, [userService]);
	const handleSubmit = () => {
		if (search === '') {
			setSearchedUsers(users);
			return;
		}
		const searched_users = users?.filter((user) =>
			user.username.toLowerCase().includes(search.toLowerCase())
		);

		setSearchedUsers(searched_users);
	};

	if (loading) {
		return (
			<div className='w-screen h-screen flex justify-center items-center'>
				<p>Loading...</p>
			</div>
		);
	} else {
		return (
			<div className='container mx-auto py-8 px-4 min-h-screen'>
				<div>
					<div className='mb-6 flex w-full items-center space-x-2'>
						<Input
							className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
							placeholder='Search books...'
							type='search'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<Button
							type='submit'
							variant='outline'
							onClick={handleSubmit}
						>
							Search
						</Button>
					</div>
					<p className='text-2xl font-semibold m-4'>Users</p>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
						{searchedUsers?.map((user) => (
							<UserCard
								key={user.id}
								user={user}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
};

export default Page;
