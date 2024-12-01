interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieListItemProps {
  movie: Movie;
  index: number;
  onPressHeart: (movie: Movie) => void;
  isFavorite?: boolean;
}

interface useMovieListItemProps {
  movie: Movie;
  onPressHeart: (movie: Movie) => void;
}

interface renderItemProps {
  item: Movie
  index: number 
}

export { Movie, MovieListItemProps, useMovieListItemProps, renderItemProps };
