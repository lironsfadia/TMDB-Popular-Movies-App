import { TabBarIcon } from 'components/TabBarIcon';
import { TABS } from 'consts/tabs';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Platform.select({
          ios: TABS.ACTIVE_TINT_COLOR.IOS,
          android: TABS.ACTIVE_TINT_COLOR.ANDROID,
          default: TABS.ACTIVE_TINT_COLOR.IOS,
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: TABS.TAB_NAMES.MOVIES,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="film" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: TABS.TAB_NAMES.WATCHLIST,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="star" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
