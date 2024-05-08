// stores/useBookStore.ts
import { create } from 'zustand';
import BookService from '@/services/concrete/BookService';
import IBookService from '@/services/abstract/IBookService';
import Book from '@/types/Book';

interface BookState {
	books: Book[];
	fetchBooks: () => Promise<void>;
	fetchBookById: (id: number) => Promise<void>;
	createBook: (bookData: Partial<Book>) => Promise<void>;
	updateBook: (id: number, bookData: Partial<Book>) => Promise<void>;
	deleteBook: (id: number) => Promise<void>;
}

const bookService: IBookService = new BookService();

export const useBookStore = create<BookState>((set, get) => ({
	books: [],

	fetchBooks: async () => {
		const books = await bookService.getBooks();
		set({ books });
	},

	fetchBookById: async (id: number) => {
		const book = await bookService.getBookById(id);
		set({ books: [...get().books.filter((b) => b.id !== id), book] });
	},

	createBook: async (bookData: Partial<Book>) => {
		const newBook = await bookService.createBook(bookData);
		set({ books: [...get().books, newBook] });
	},

	updateBook: async (id: number, bookData: Partial<Book>) => {
		const updatedBook = await bookService.updateBook(id, bookData);
		set({
			books: get().books.map((book) => (book.id === id ? updatedBook : book))
		});
	},

	deleteBook: async (id: number) => {
		await bookService.deleteBook(id);
		set({ books: get().books.filter((book) => book.id !== id) });
	}
}));
