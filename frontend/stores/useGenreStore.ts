// stores/useGenreStore.ts
import {create} from 'zustand';
import { GenreService } from '@/services/concrete/GenreService';
import { IGenreService } from '@/services/abstract/IGenreService';
import Genre from '@/types/Genre';

interface GenreState {
	genres: Genre[];
	fetchGenres: () => Promise<void>;
	fetchGenreById: (id: number) => Promise<void>;
	createGenre: (genreData: Partial<Genre>) => Promise<void>;
	updateGenre: (id: number, genreData: Partial<Genre>) => Promise<void>;
	deleteGenre: (id: number) => Promise<void>;
}

const genreService: IGenreService = new GenreService();

export const useGenreStore = create<GenreState>((set, get) => ({
	genres: [],

	fetchGenres: async () => {
		const genres = await genreService.getGenres();
		set({ genres });
	},

	fetchGenreById: async (id: number) => {
		const genre = await genreService.getGenreById(id);
		set({ genres: [...get().genres.filter((g) => g.id !== id), genre] });
	},

	createGenre: async (genreData: Partial<Genre>) => {
		const newGenre = await genreService.createGenre(genreData);
		set({ genres: [...get().genres, newGenre] });
	},

	updateGenre: async (id: number, genreData: Partial<Genre>) => {
		const updatedGenre = await genreService.updateGenre(id, genreData);
		set({
			genres: get().genres.map((genre) =>
				genre.id === id ? updatedGenre : genre
			)
		});
	},

	deleteGenre: async (id: number) => {
		await genreService.deleteGenre(id);
		set({ genres: get().genres.filter((genre) => genre.id !== id) });
	}
}));
