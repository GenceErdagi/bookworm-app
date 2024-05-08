// services/concrete/BookService.ts
import { injectable } from 'tsyringe';
import IBookService from '@/services/abstract/IBookService';
import Book from '@/types/Book';
import fetchAPI from '@/lib/api';

@injectable()
export default class BookService implements IBookService {
	async getBooks(): Promise<Book[]> {
		return fetchAPI('books/');
	}

	async getBookById(id: number): Promise<Book> {
		return fetchAPI(`books/${id}/`);
	}

	async createBook(data: Partial<Book>): Promise<Book> {
		return fetchAPI('books/create/', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	async updateBook(id: number, data: Partial<Book>): Promise<Book> {
		return fetchAPI(`books/${id}/update/`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
	}

	async deleteBook(id: number): Promise<void> {
		await fetchAPI(`books/${id}/delete/`, { method: 'DELETE' });
	}
}
