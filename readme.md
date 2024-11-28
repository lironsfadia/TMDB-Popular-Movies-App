# Movie App (liron Bregman)

React Native (Expo) app to discover popular movies and manage your watchlist.

## Features

- Popular movies feed based on user's country
- Infinite scroll pagination
- "Add to Watchlist" functionality
- Responsive alien-themed UI
- Movie details: rank, poster, title, popularity, rating

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

```bash
npm install
```

2. Create `.env` file:

```
TMDB_API_KEY=your_api_key
```

3. Start development:

```bash
npm start
```

4. Run on platform:

```bash
npm run ios
# or
npm run android
```

## Project Structure

```
src/
  ├── app/                 # Expo Router screens
  ├── components/          # Reusable components
  ├── data/               # API/Cache logic
  ├── hooks/              # Custom hooks
  ├── types/              # TypeScript types
  ├── utils/              # Helper functions
  └── consts/             # Constants
```

## Folder Navigation

- `/` - Movies list
- `/watchlist` - Saved movies

## Additional Features - in the fe

- Offline support via caching (not impl)
- Performance optimized with FastImage

# use Radon IDE extension to see it working without XCODE!
