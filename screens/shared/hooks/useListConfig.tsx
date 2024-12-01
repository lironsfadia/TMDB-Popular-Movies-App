import { useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { SCREENS } from '@/consts/screens';
import { Movie } from '@/screens/moviesScreen/types';

export interface UseListConfigProps {
  onHeartPress: (movie: Movie) => void;
  isFavorite?: (movieId: number) => boolean;
}

export const useListConfig = () => {
  const keyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  const getItemLayout = useCallback(
    (data: ArrayLike<Movie> | null | undefined, index: number) => ({
      length: SCREENS.LIST.ITEM_HEIGHT,
      offset: SCREENS.LIST.ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const renderFooter = useCallback(
    (loading: boolean) =>
      loading ? (
        <View className="items-center justify-center py-4">
          <ActivityIndicator size="small" />
        </View>
      ) : null,
    []
  );

  const renderSeparator = useCallback(() => <View className="my-4 h-[1px] bg-gray-800" />, []);

  return {
    keyExtractor,
    getItemLayout,
    renderFooter,
    renderSeparator,
  };
};
