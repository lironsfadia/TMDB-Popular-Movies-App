import { useIsFocused } from '@react-navigation/native';
import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { DataCache } from '../../../data/DataCache';
import { createApiClient } from '../../../data/apiClient';
import MovieListItem from '../components/MovieListItem';
import { API_ERROR, FETCH_ERROR } from '../consts';
import { Movie, renderItemProps } from '../types';
import { getLocale, getCountry } from '../utils';

import { PAGE_SIZE } from '@/consts/screens';
import { useListConfig } from '@/screens/shared/hooks/useListConfig';

export function useMoviesScreen() {
  const isFocused = useIsFocused();

  const api = useMemo(() => createApiClient(), []);
  const cache = useMemo(() => DataCache.getInstance(), []);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [country, setCountry] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [watchlistUpdate, setWatchlistUpdate] = useState(0);

  const { keyExtractor, getItemLayout, renderFooter, renderSeparator } = useListConfig();

  const handleHeartPress = useCallback(
    (movie: Movie) => {
      const isCurrentlyFavorite = cache.getWhitelistItem(movie.id) !== null;

      if (isCurrentlyFavorite) {
        cache.deleteWhitelistItem(movie);
      } else {
        cache.setWhitelistItem(movie);
      }

      setWatchlistUpdate((prev) => prev + 1);
    },
    [cache, watchlistUpdate, isFocused]
  );

  const fetchMovies = useCallback(
    async (pageNum: number): Promise<Movie[]> => {
      try {
        const data = await api.getPopularMovies(
          pageNum,
          language ?? undefined,
          country ?? undefined
        );

        if (!data?.results?.length) {
          throw new Error(API_ERROR);
        }

        return data.results;
      } catch (err) {
        console.error('fetchMovies error:', err);
        throw new Error(err instanceof Error ? err.message : FETCH_ERROR);
      }
    },
    [api, language, country]
  );

  const fetchNextPage = useCallback(async () => {
    if (loading || !hasNextPage || !isInitialized) return;

    setLoading(true);
    setError(null);

    try {
      const cachedData = cache.get(page);
      if (cachedData?.length) {
        setMovies((prev) => [...prev, ...cachedData]);
        setPage((prev) => prev + 1);
        setHasNextPage(cachedData.length >= PAGE_SIZE);
        return;
      }

      const newMovies = await fetchMovies(page);
      cache.set(page, newMovies);
      setMovies((prev) => [...prev, ...newMovies]);
      setPage((prev) => prev + 1);
      setHasNextPage(newMovies.length >= PAGE_SIZE);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasNextPage, isInitialized, cache, fetchMovies]);

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
  }, [isInitialized, fetchNextPage]);

  useEffect(() => {
    return () => cache.clear();
  }, [cache]);

  const renderItem = useCallback(
    ({ item, index }: renderItemProps) => (
      <MovieListItem
        movie={item}
        index={index}
        onPressHeart={handleHeartPress}
        isFavorite={cache.getWhitelistItem(item.id) !== null}
      />
    ),
    [cache, handleHeartPress, isFocused, watchlistUpdate]
  );

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
    getItemLayout,
  };
}
