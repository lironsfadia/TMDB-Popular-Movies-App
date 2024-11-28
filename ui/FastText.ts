/* eslint-disable simple-import-sort/imports */
// This is lighter and faster(up to 2 times) version of Text component
// with all features except nested <Text> / <Image> components
// Context - https://twitter.com/todor_one/status/1421419537673723907

// @ts-expect-error No types
import { NativeText } from 'react-native/Libraries/Text/TextNativeComponent';
import { Animated, Text } from 'react-native';
import Reanimated from 'react-native-reanimated';

export const FastText: typeof Text = NativeText;
export const AnimatedFastText = Animated.createAnimatedComponent(FastText);
export const ReanimatedFastText = Reanimated.createAnimatedComponent(FastText);
