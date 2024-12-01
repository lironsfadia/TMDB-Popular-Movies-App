import { useCallback } from 'react';

import { useMovieListItemProps } from '../types';

const useMovieListItem = ({ movie, onPressHeart }: useMovieListItemProps) => {
  const releaseYear = new Date(movie.release_date).getFullYear();

  const handlePress = useCallback(() => {
    onPressHeart(movie);
  }, [movie, onPressHeart]);

  return { releaseYear, handlePress };
};

export default useMovieListItem;
