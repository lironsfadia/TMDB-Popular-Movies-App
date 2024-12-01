import { Film } from 'lucide-react-native';
import { FlatList, SafeAreaView, View, StyleSheet, Text } from 'react-native';

import { SCREENS } from '@/consts/screens';
import useWhitelistMovies from '@/screens/whitelistScreen/hooks/useWhitelistMovies';
export default function Watchlist() {
  const { keyExtractor, renderItem, whitelistMovies, getItemLayout } = useWhitelistMovies();

  return (
    <SafeAreaView className="flex-1 p-2">
      <View className="ios:p-6 android:p-4 mb-6 flex-row justify-start gap-2 border-b border-b-gray-200 bg-white">
        <Film size={SCREENS.ICON_SIZE_LARGE} color={SCREENS.COLORS.RED} />
        <Text className="ml-2 text-2xl font-bold color-red-600">Watchlist</Text>
      </View>

      <FlatList
        className="flex-1 bg-white"
        data={whitelistMovies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={SCREENS.LIST.THRESHOLD}
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
