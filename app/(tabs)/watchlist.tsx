import { FlatList, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Film } from 'lucide-react-native';

import { useWhitelistMovies } from '@/screens/whitelistScreen/hooks/useWhitelistMovies';

import { ITEMS } from '@/consts/list';
import { useIsFocused } from '@react-navigation/native';

export default function Watchlist() {
  const { keyExtractor, renderItem, whitelistMovies } = useWhitelistMovies();

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="ios:p-6 android:p-4 mb-6 flex-row justify-start gap-2 border-b border-b-gray-200 bg-white">
        <Film size={ITEMS.ICON_SIZE_LARGE} color={'red'} />
        <Text className="ml-2 text-2xl font-bold color-red-600">Movies List!</Text>
      </View>

      <FlatList
        className="flex-1 bg-white"
        data={whitelistMovies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={ITEMS.LIST.THRESHOLD}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: ITEMS.STYLES.PADDING,
    gap: ITEMS.STYLES.GAP,
  },
});
