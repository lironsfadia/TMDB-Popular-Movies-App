// app/_layout.js
import '../global.css';
import { useCallback, useEffect, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// cache, batching, lookup table, memoization, throttling, debouncing, etc.
// dark mode
// unit test
// local first
// libs limit
// only ios? which devices?
// performance, scale upp
// edge cases
//with resoution?
//What level of UI polish are you expecting?
// fetch absraction
// error handling
// api client

// flightContainer: {
//   backgroundColor: COLORS.primary.white,
//   borderRadius: LAYOUT.radius.lg,
//   padding: LAYOUT.spacing.md,
//   gap: LAYOUT.spacing.sm,
//   ...LAYOUT.shadow.medium,
// },

// https://developer.themoviedb.org/reference/movie-popular-list
// https://api.themoviedb.org/3/movie/550?api_key=40ab4b29399a2e3f961acf68acc457e8

// https://api.themoviedb.org/3/movie?api_key=40ab4b29399a2e3f961acf68acc457e8

// https://api.themoviedb.org/3/movie/popular?api_key=40ab4b29399a2e3f961acf68acc457e8
// https://api.themoviedb.org/3/movie/popular?api_key=40ab4b29399a2e3f961acf68acc457e8&page=2

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        // Simulate loading - replace with your actual initialization code
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // Hide splash screen once app is ready
  useEffect(() => {
    if (appIsReady) {
      console.log('App is ready, hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // Don't return null - instead return the Stack navigation even if not ready
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <ErrorBoundary>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ErrorBoundary>
      </View>
    </ThemeProvider>
  );
}
