import { Platform, TextStyle } from 'react-native';

// Updated interface to extend TextStyle
export interface FontModificatorType extends TextStyle {
  fontWeight?: TextStyle['fontWeight'];
  fontSize: number;
  lineHeight: number;
  color: string;
}

export const font800 = (size: number, color: string): FontModificatorType => ({
  fontWeight: Platform.select({ ios: '800', android: 'bold' }) as TextStyle['fontWeight'],
  fontSize: size,
  lineHeight: size * 1.33,
  color,
});

export const font700 = (size: number, color: string): FontModificatorType => ({
  fontWeight: '700' as TextStyle['fontWeight'],
  fontSize: size,
  lineHeight: size * 1.33,
  color,
});

export const font600 = (size: number, color: string): FontModificatorType => ({
  fontWeight: '600' as TextStyle['fontWeight'],
  fontSize: size,
  lineHeight: size * 1.33,
  color,
});

export const font400 = (size: number, color: string): FontModificatorType => ({
  fontWeight: 'normal' as TextStyle['fontWeight'],
  fontSize: size,
  lineHeight: size * 1.33,
  color,
});

export const font300 = (size: number, color: string): FontModificatorType => ({
  fontWeight: '300' as TextStyle['fontWeight'],
  fontSize: size,
  lineHeight: size * 1.33,
  color,
});
