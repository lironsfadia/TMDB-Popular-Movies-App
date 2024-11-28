import { Movie } from '@/screens/moviesScreen/types';
import axios from 'axios';

// API Types
export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type ApiClient = {
  getPopularMovies: (page: number, locale?: string, region?: string) => Promise<MovieResponse>;
};

// API Client
const API_KEY = '40ab4b29399a2e3f961acf68acc457e8';
const BASE_URL = 'https://api.themoviedb.org/3';

export const createApiClient = (): ApiClient => ({
  getPopularMovies: (page: number = 1, locale: string = 'en-US', region?: string) => {
    return axios
      .get<MovieResponse>(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${locale}&region=${region}&sort_by=popularity.desc&page=${page}`,
        {
          params: {},
        }
      )
      .then((res) => res.data);
  },
});
