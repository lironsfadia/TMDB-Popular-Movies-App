import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Heart } from 'lucide-react-native';
import { Movie, MovieListItemProps } from '../types';
import FastImage from 'react-native-fast-image';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieListItem = ({ movie, index, onPressHeart, isFavorite = false }: MovieListItemProps) => {
  return (
    <View
      className="mb-4 flex-row gap-3 rounded-xl bg-white p-4 shadow-lg"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}>
      <View className="mr-2 h-8 w-8 items-center justify-center gap-4 rounded-full bg-gray-100">
        <Text className="text-base font-bold text-gray-600">#{index + 1}</Text>
      </View>

      <FastImage
        source={{
          uri: movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : 'https://via.placeholder.com/300x450',
        }}
        className="h-28 w-20 rounded-lg shadow-md"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      />

      <View className="ml-3 flex-1">
        <Text className="mb-2 text-lg font-bold text-gray-900" numberOfLines={2}>
          {movie.title}
        </Text>
        <Text className="text-base text-gray-600">{Math.round(movie.popularity)} views</Text>
      </View>

      <Pressable
        onPress={() => onPressHeart(movie)}
        className="rounded-full bg-gray-50 p-3"
        hitSlop={8}
        style={{
          shadowColor: isFavorite ? '#ef4444' : '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
        <Heart
          size={24}
          color={isFavorite ? '#ef4444' : '#9ca3af'}
          fill={isFavorite ? '#ef4444' : 'none'}
        />
      </Pressable>
    </View>
  );
};

export default MovieListItem;
