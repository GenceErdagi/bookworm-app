import Genre from './Genre';

export default interface Book {
	id: number;
	title: string;
	author: string;
	publication_date: string;
	isbn: string;
	genres: Genre[];
	description: string;
	cover_image?: string;
}
