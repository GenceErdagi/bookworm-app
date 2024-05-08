// services/abstract/IGenreService.ts
import Genre from '@/types/Genre';

export default interface IGenreService {
	getGenres(): Promise<Genre[]>;
	getGenreById(id: number): Promise<Genre>;
	createGenre(data: Partial<Genre>): Promise<Genre>;
	updateGenre(id: number, data: Partial<Genre>): Promise<Genre>;
	deleteGenre(id: number): Promise<void>;
}
