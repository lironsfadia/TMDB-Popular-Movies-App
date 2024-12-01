import { Film } from 'lucide-react-native';
import { View, Text, ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useMoviesScreen } from 'screens/moviesScreen/hooks/useMoviesScreen';

import { SCREENS } from '@/consts/screens';

export default function Home() {
  const {
    movies,
    error,
    loading,
    renderItem,
    keyExtractor,
    onEndReached,
    renderFooter,
    renderSeparator,
    getItemLayout,
  } = useMoviesScreen();

  if (error) {
    return (
      <View className="flex-1 justify-center align-middle">
        <Text className="text-lg font-bold text-red-400">{error}</Text>
      </View>
    );
  }

  if (loading && movies?.length === 0) {
    return (
      <View className="flex-1 justify-center align-middle">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="ios:p-6 android:p-4 mb-6 flex-row justify-start gap-2 border-b border-b-gray-200 bg-white">
        <Film size={SCREENS.ICON_SIZE_LARGE} color={SCREENS.COLORS.GREEN} />
        <Text className="ml-2 text-2xl font-bold color-green-600">Movies List</Text>
      </View>

      <FlatList
        className="flex-1 bg-white"
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={SCREENS.LIST.THRESHOLD}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderSeparator}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: SCREENS.STYLES.PADDING,
    gap: SCREENS.STYLES.GAP,
  },
});
