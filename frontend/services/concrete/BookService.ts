// services/concrete/BookService.ts
import axios from 'axios';
import { API_URL } from '@/utils/apiConfig';
import IBookService from '@/services/abstract/IBookService';
import Book from '@/types/Book';

export default class BookService implements IBookService {
	async getBooks(): Promise<Book[]> {
		const response = await axios.get(`${API_URL}/books/`);
		return response.data;
	}

	async getBookById(id: number): Promise<Book> {
		const response = await axios.get(`${API_URL}/books/${id}/`);
		return response.data;
	}

	async createBook(bookData: Partial<Book>): Promise<Book> {
		const response = await axios.post(`${API_URL}/books/create/`, bookData);
		return response.data;
	}

	async updateBook(id: number, bookData: Partial<Book>): Promise<Book> {
		const response = await axios.put(
			`${API_URL}/books/${id}/update/`,
			bookData
		);
		return response.data;
	}

	async deleteBook(id: number): Promise<void> {
		await axios.delete(`${API_URL}/books/${id}/delete/`);
	}
}
