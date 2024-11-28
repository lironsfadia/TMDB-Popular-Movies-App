import { useState, useCallback, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MovieListItem from '../components/MovieListItem';
import { Movie } from '../types';
import { getLocale, getCountry } from '../utils';
import { createApiClient } from '../../../data/apiClient';
import { DataCache } from '../../../data/DataCache';
import { PAGE_SIZE } from '@/consts/list';
import { useIsFocused } from '@react-navigation/native';

export function useMoviesScreen() {
  const isFocused = useIsFocused();

  const api = createApiClient();
  const cache = DataCache.getInstance();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [country, setCountry] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [favoriteUpdate, setFavoriteUpdate] = useState(0);

  const handleHeartPress = useCallback(
    (movie: Movie) => {
      cache.setWhitelistItem(movie);
      setFavoriteUpdate((prev) => prev + 1);
    },
    [movies]
  );

  const fetchMovies = async (pageNum: number): Promise<Movie[]> => {
    try {
      const data = await api.getPopularMovies(pageNum, language ?? undefined, country ?? undefined);

      if (!data || !Array.isArray(data.results)) {
        throw new Error('Invalid API response format');
      }

      return data.results;
    } catch (err) {
      console.error('fetchMovies error:', err);
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch movies');
    }
  };

  const fetchNextPage = useCallback(async () => {
    if (loading || !hasNextPage || !isInitialized) return;

    setLoading(true);
    setError(null);

    try {
      const cachedData = cache.get(page);
      if (cachedData && Array.isArray(cachedData)) {
        setMovies((prev) => {
          try {
            return [...prev, ...cachedData];
          } catch (err) {
            console.error('State update error:', err);
            return prev;
          }
        });
        setPage((prev) => prev + 1);
        setHasNextPage(cachedData.length >= PAGE_SIZE);
        return;
      }

      const newMovies = await fetchMovies(page);
      if (newMovies && Array.isArray(newMovies)) {
        cache.set(page, newMovies);
        setMovies((prev) => {
          try {
            return [...prev, ...newMovies];
          } catch (err) {
            console.error('State update error:', err);
            return prev;
          }
        });
        setPage((prev) => prev + 1);
        setHasNextPage(newMovies.length >= PAGE_SIZE);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasNextPage, language, country, isInitialized]);

  useEffect(() => {
    const init = async () => {
      try {
        setLanguage(getLocale());
        const countryData = await getCountry();
        if (countryData) {
          setCountry(countryData);
        }
        setIsInitialized(true);
      } catch (err) {
        console.error('Error initializing:', err);
        setError('Failed to initialize app settings');
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (isInitialized) {
      fetchNextPage();
    }
  }, [isInitialized]);

  useEffect(() => {
    return () => cache.clear();
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: Movie; index: number }) => (
      <MovieListItem
        movie={item}
        index={index}
        onPressHeart={() => handleHeartPress(item)}
        isFavorite={cache.getWhitelistItem(item.id) !== null}
      />
    ),
    [cache, isFocused, favoriteUpdate]
  );

  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  const renderFooter = useCallback(() => {
    if (!loading) return null;
    return (
      <View className="items-center justify-center py-4">
        <ActivityIndicator size="small" />
      </View>
    );
  }, [loading]);

  const renderSeparator = useCallback(() => <View className="my-4 h-[4px] bg-gray-800" />, []);

  return {
    movies,
    loading,
    error,
    hasNextPage,
    renderItem,
    keyExtractor,
    renderFooter,
    renderSeparator,
    onEndReached: fetchNextPage,
  };
}
