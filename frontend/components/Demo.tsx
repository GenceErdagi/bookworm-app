'use client';

import React, { FC, useEffect, useState } from 'react';

interface DemoProps {}

const Demo: FC<DemoProps> = ({}) => {
	const [books, setBooks] = useState([]);
	useEffect(() => {
		fetch('http://127.0.0.1:8000/api/books/?format=json', {
			method: 'GET'
		})
			.then((response) => response.json())
			.then((data) => {
				setBooks(data);
				console.log(data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div>
			<h1 className='h-4'>Books</h1>
			{books.map((book: any) => {
				return (
					<div key={book.id}>
						<h5>
							{book.title} : {book.author}
						</h5>
					</div>
				);
			})}
		</div>
	);
};

export default Demo;
