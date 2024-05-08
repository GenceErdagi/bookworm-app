import Book from './Book';
import UserProfile from './User';

export default interface Review {
	id: number;
	book: Book;
	user: UserProfile;
	rating: number;
	comment: string;
}
