'use client';
import React, { useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const UserComponent = () => {
	const {
		user,
		login,
		logout,
		refreshAccessToken,
		fetchUser,
		updateUser,
		deleteUser,
		error,
		clearError
	} = useUserStore();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [userId, setUserId] = useState('');
	const [newEmail, setNewEmail] = useState('');

	const handleLogin = async () => {
		await login(username, password);
	};

	const handleFetchUser = async () => {
		if (userId) {
			await fetchUser(parseInt(userId));
		}
	};

	const handleUpdateUser = async () => {
		if (userId) {
			await updateUser(parseInt(userId), { email: newEmail });
		}
	};

	const handleDeleteUser = async () => {
		if (userId) {
			await deleteUser(parseInt(userId));
		}
	};

	return (
		<div>
			{error && (
				<div>
					<p>Error: {error}</p>
					<button onClick={clearError}>Clear Error</button>
				</div>
			)}
			<div>
				<input
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleLogin}>Login</button>
			</div>
			<div>
				{user && (
					<div>
						<h1>User Profile</h1>
						<p>ID: {user.id}</p>
						<p>Username: {user.username}</p>
						<p>Email: {user.email}</p>
						<button onClick={logout}>Logout</button>
						<button onClick={refreshAccessToken}>Refresh Token</button>
						<input
							placeholder='User ID to fetch'
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
						/>
						<button onClick={handleFetchUser}>Fetch User</button>
						<input
							placeholder='New Email'
							value={newEmail}
							onChange={(e) => setNewEmail(e.target.value)}
						/>
						<button onClick={handleUpdateUser}>Update Email</button>
						<button onClick={handleDeleteUser}>Delete User</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserComponent;
