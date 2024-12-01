import { Calendar, Heart, Star } from 'lucide-react-native';
import React, { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import Image from 'ui/Image';

import { IMAGE_BASE_URL } from '../consts';
import useMovieListItem from '../hooks/useMovieListItem';
import { MovieListItemProps } from '../types';

import { SCREENS } from '@/consts/screens';

const MovieListItem = memo(
  ({ movie, index, onPressHeart, isFavorite = false }: MovieListItemProps) => {
    const { releaseYear, handlePress } = useMovieListItem({ movie, onPressHeart });

    return (
      <View className="android:elevation-2 rounded-xl bg-white shadow-sm">
        <View className="flex-row items-center gap-2 rounded-xl border border-gray-100 p-4">
          <View className="mr-1 h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Text className="text-base font-bold text-gray-600">#{index + 1}</Text>
          </View>

          <View className="ml-2 flex-1 justify-center gap-2">
            <Text className="mb-2 text-lg font-bold text-gray-900" numberOfLines={2}>
              {movie.title}
            </Text>

            <View className="mb-1.5 flex-row items-center">
              <Calendar size={14} className="text-gray-500" />
              <Text className="ml-1 text-sm text-gray-600">{releaseYear}</Text>
            </View>

            <View className="mb-1 flex-row items-center">
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text className="ml-1 text-sm text-gray-600">
                {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} votes)
              </Text>
            </View>
          </View>

          <Image uri={`${IMAGE_BASE_URL}${movie.poster_path}`} />

          <Pressable
            onPress={handlePress}
            className={`android:elevation-1 rounded-full p-3 shadow-sm ${
              isFavorite ? 'bg-red-50' : 'bg-gray-50'
            }`}
            hitSlop={8}>
            <Heart
              size={24}
              color={
                isFavorite
                  ? SCREENS.FAVORITES.ICON_COLORS.FILLED
                  : SCREENS.FAVORITES.ICON_COLORS.UNFILLED
              }
              fill={isFavorite ? SCREENS.FAVORITES.ICON_COLORS.FILLED: 'none'}
            />
          </Pressable>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.movie.id === nextProps.movie.id &&
      prevProps.index === nextProps.index &&
      prevProps.isFavorite === nextProps.isFavorite
    );
  }
);

export default MovieListItem;
