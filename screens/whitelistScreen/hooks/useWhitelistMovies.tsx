import { useCallback, useEffect, useState } from 'react';

import { DataCache } from '@/data/DataCache';
import MovieListItem from '@/screens/moviesScreen/components/MovieListItem';
import { Movie } from '@/screens/moviesScreen/types';
import { useIsFocused } from '@react-navigation/native';

const useWhitelistMovies = () => {
  const isFocused = useIsFocused();
  const [favoriteUpdate, setFavoriteUpdate] = useState(0);

  const cache = DataCache.getInstance();
  const [whitelistMovies, setWhitelistMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const data = cache.getWhitelist();
    setWhitelistMovies(data);
  }, [isFocused, favoriteUpdate]);

  const handleHeartPress = useCallback((movie: Movie) => {
    cache.deleteWhitelistItem(movie);
    setFavoriteUpdate((prev) => prev + 1);
  }, []);

  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item, index }: { item: Movie; index: number }) => (
      <MovieListItem
        movie={item}
        index={index}
        onPressHeart={() => handleHeartPress(item)}
        isFavorite={cache.getWhitelistItem(item.id) !== null}
      />
    ),
    [cache, favoriteUpdate]
  );

  return { keyExtractor, renderItem, whitelistMovies };
};

export { useWhitelistMovies };
