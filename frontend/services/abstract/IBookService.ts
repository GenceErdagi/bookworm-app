// services/abstract/IBookService.ts
import Book from '@/types/Book';

export default interface IBookService {
	getBooks(): Promise<Book[]>;
	getBookById(id: number): Promise<Book>;
	createBook(bookData: Partial<Book>): Promise<Book>;
	updateBook(id: number, bookData: Partial<Book>): Promise<Book>;
	deleteBook(id: number): Promise<void>;
}
