import { useColorScheme } from 'react-native';

/**
 * JS mirror of the runtime colours in styles/lemniscate.css, for native props that
 * cannot take a className. Kept equal to the stylesheet by test/lib/theme.test.ts.
 */
export const THEME = {
  light: {
    background: '#ffffff',
    primary: '#1b60c0',
    secondary: '#f2f2f3',
    mutedForeground: '#424448',
    ring: '#1b60c0',
  },
  dark: {
    background: '#121821',
    primary: '#3cb6d7',
    secondary: '#242c38',
    mutedForeground: '#98a4b3',
    ring: '#3cb6d7',
  },
} as const;

export type ThemeColors = { [K in keyof (typeof THEME)['light']]: string };

export function useThemeColors(): ThemeColors {
  return THEME[useColorScheme() === 'dark' ? 'dark' : 'light'];
}
