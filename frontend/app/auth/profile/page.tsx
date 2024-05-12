'use client';
import { useAuth } from '@/hooks/useAuth';
import React, { FC } from 'react';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
	const { user } = useAuth();
	return (
		<div>
			<h1>Profile</h1>
			<p>Welcome {user?.username}</p>
		</div>
	);
};

export default Page;
