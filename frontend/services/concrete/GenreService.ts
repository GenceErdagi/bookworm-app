// services/concrete/GenreService.ts
import axios from 'axios';
import { IGenreService } from '@/services/abstract/IGenreService';
import Genre from '@/types/Genre';

export class GenreService implements IGenreService {
	private apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/genres`;

	async getGenres(): Promise<Genre[]> {
		const response = await axios.get(this.apiUrl);
		return response.data;
	}

	async getGenreById(id: number): Promise<Genre> {
		const response = await axios.get(`${this.apiUrl}/${id}`);
		return response.data;
	}

	async createGenre(data: Partial<Genre>): Promise<Genre> {
		const response = await axios.post(this.apiUrl, data);
		return response.data;
	}

	async updateGenre(id: number, data: Partial<Genre>): Promise<Genre> {
		const response = await axios.put(`${this.apiUrl}/${id}`, data);
		return response.data;
	}

	async deleteGenre(id: number): Promise<void> {
		await axios.delete(`${this.apiUrl}/${id}`);
	}
}
