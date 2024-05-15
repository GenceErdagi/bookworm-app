'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { FC, useCallback, useEffect } from 'react';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
	const router = useRouter();
	const { logout } = useAuth();
	const handleLogout = useCallback(() => {
		router.push('/');
		logout();
	}, [router, logout]);
	useEffect(() => {
		handleLogout();
	}, [handleLogout]);
	return <div className='h-screen w-screen'></div>;
};

export default Page;
