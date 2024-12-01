# Movie App (Liron Bregman)

React Native (Expo) app to discover popular movies and manage your watchlist.

## Features

- Popular movies feed based on user's country
- Infinite scroll pagination
- "Add to Watchlist" functionality
- Responsive alien-themed UI
- Movie details: rank, poster, title, rating

## Tech Stack

- Expo Router
- NativeWind (Tailwind CSS)
- TypeScript
- react-native-fast-image
- expo-location (country detection)
- expo-localization
- TMDB API
- Custom caching system

## Setup

1. Install dependencies:

yarn install

2. Create `.env` file:

TMDB_API_KEY=your_api_key

3. Run:

npx expo run:ios --device

### Additional Setup Steps

1. Prebuild Expo project:

npx expo prebuild

2. For Mac users - Enable Automation permissions:

- Go to System Preferences
- Navigate to Security & Privacy > Privacy
- Select "Automation" from the left sidebar
- Find Terminal/VSCode
- Enable checkbox next to "System Events"

3. If using React Native CLI (for iOS):

cd ios
pod deintegrate
pod cache clean --all
pod install

4. Clean prebuild:

npx expo prebuild --clean

## Project Structure

```
src/
 ├── app/ # Expo Router screens
 ├── components/ # Reusable components
 ├── data/ # API/Cache logic
 ├── hooks/ # Custom hooks
 ├── types/ # TypeScript types
 ├── utils/ # Helper functions
 └── consts/ # Constants
```

## Folder Navigation

- `/` - Movies list
- `/watchlist` - Saved movies

## Additional Features

- Offline support via caching (not implemented)
- Performance optimized with FastImage

## Development Tools

- Use Radon IDE extension to see it working without Xcode!

## Troubleshooting

If you encounter build issues:

1. Clear Expo cache:

expo start --clear

2. Reset Metro bundler:

yarn start --reset-cache

3. Clean Watchman:

watchman watch-del-all

USE RADON IDE EXTENSTION - FOR SAVE WORLD!
