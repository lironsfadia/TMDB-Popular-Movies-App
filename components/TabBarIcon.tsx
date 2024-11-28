import { TABS } from 'consts/tabs';
import { Film, Home, Search, Settings, Star } from 'lucide-react-native';
import { TabBarIconProps, TabIcons } from './types';
import { useMemo } from 'react';

const icons: TabIcons = {
  film: Film,
  star: Star,
};

export const TabBarIcon = ({ name, color, focused }: TabBarIconProps) => {
  const Icon = icons[name];

  const styles = useMemo(
    () => `mb-[-3px] ${focused ? TABS.OPACITY.ACTIVE : TABS.OPACITY.INACTIVE}`,
    [focused]
  );

  return <Icon size={TABS.ICON_SIZE} className={styles} color={color} />;
};
