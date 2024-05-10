import Book from './Book';

export default interface User {
	id: number;
	username: string;
	email: string;
	is_staff: boolean;
	is_active: boolean;
	is_superuser: boolean;
	first_name?: string;
	last_name?: string;
	wishlist: Book[];
}
