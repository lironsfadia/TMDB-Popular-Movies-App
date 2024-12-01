import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DataCache } from '@/data/DataCache';
import MovieListItem from '@/screens/moviesScreen/components/MovieListItem';
import { Movie } from '@/screens/moviesScreen/types';
import { useListConfig } from '@/screens/shared/hooks/useListConfig';

const useWhitelistMovies = () => {
  const isFocused = useIsFocused();
  const [whitelistMovies, setWhitelistMovies] = useState<Movie[]>([]);
  const cache = useMemo(() => DataCache.getInstance(), []);
  const { keyExtractor, getItemLayout, renderFooter, renderSeparator } = useListConfig();

  useEffect(() => {
    if (isFocused) {
      const data = cache.getWhitelist();
      setWhitelistMovies(data);
    }
  }, [isFocused, cache]);

  const handleHeartPress = useCallback(
    (movie: Movie) => {
      try {
        cache.deleteWhitelistItem(movie);
        setWhitelistMovies((prevMovies) => prevMovies.filter((m) => m.id !== movie.id));
      } catch (error) {
        console.error('Error removing movie from whitelist:', error);
      }
    },
    [cache]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Movie; index: number }) => (
      <MovieListItem
        movie={item}
        index={index}
        onPressHeart={() => handleHeartPress(item)}
        isFavorite
      />
    ),
    [handleHeartPress]
  );

  return {
    renderFooter,
    renderSeparator,
    keyExtractor,
    renderItem,
    getItemLayout,
    whitelistMovies,
    isLoading: false,
    error: null,
  };
};

export default useWhitelistMovies;
