import Genre from './Genre';

export default interface Book {
	id: number;
	title: string;
	author: string;
	publication_date: string; // Dates are typically transferred as strings
	isbn: string;
	genres: Genre[];
	description: string;
	cover_image?: string; // Assuming cover_image is a URL string or could be null/undefined
}
