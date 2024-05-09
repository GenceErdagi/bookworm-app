// services/concrete/GenreService.ts
import { injectable } from 'tsyringe';
import IGenreService from '@/services/abstract/IGenreService';
import Genre from '@/types/Genre';
import fetchAPI from '@/lib/api';

@injectable()
export default class GenreService implements IGenreService {
	async getGenres(): Promise<Genre[]> {
		return fetchAPI('genres/');
	}

	async getGenreById(id: number): Promise<Genre> {
		return fetchAPI(`genres/${id}/`);
	}

	async createGenre(data: Partial<Genre>): Promise<Genre> {
		return fetchAPI('genres/create/', {
			method: 'POST',
			body: JSON.stringify(data)
		});
	}

	async updateGenre(id: number, data: Partial<Genre>): Promise<Genre> {
		return fetchAPI(`genres/${id}/update/`, {
			method: 'PUT',
			body: JSON.stringify(data)
		});
	}

	async deleteGenre(id: number): Promise<void> {
		await fetchAPI(`genres/${id}/delete/`, { method: 'DELETE' });
	}
}
