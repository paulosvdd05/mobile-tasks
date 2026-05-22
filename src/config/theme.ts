import { ColorSchemeName } from 'react-native';

import { appConfig } from './app';

export interface AppTheme {
  colors: {
    avatarSurface: string;
    background: string;
    backgroundStrong: string;
    backdrop: string;
    border: string;
    buttonText: string;
    contrastSurface: string;
    contrastText: string;
    danger: string;
    heroOverlayEnd: string;
    heroOverlayStart: string;
    inputBackground: string;
    inputLine: string;
    mutedSurface: string;
    placeholder: string;
    primary: string;
    primaryGradientEnd: string;
    primaryStrong: string;
    sheetHandle: string;
    sheetSurface: string;
    surface: string;
    taskSurface: string;
    text: string;
    textSecondary: string;
    white: string;
    black: string;
  };
  isDark: boolean;
  radius: typeof appConfig.radius;
  spacing: typeof appConfig.spacing;
  statusBarStyle: 'dark' | 'light';
  typography: typeof appConfig.typography;
}

const sharedTheme = {
  radius: appConfig.radius,
  spacing: appConfig.spacing,
  typography: appConfig.typography,
};

const lightTheme: AppTheme = {
  ...sharedTheme,
  colors: {
    avatarSurface: appConfig.identity.colors.neutral100,
    background: appConfig.identity.colors.neutral0,
    backgroundStrong: '#FFFFFF',
    backdrop: 'rgba(1, 22, 39, 0.28)',
    border: appConfig.identity.colors.neutral100,
    buttonText: appConfig.identity.colors.neutral0,
    contrastSurface: appConfig.identity.colors.neutral900,
    contrastText: '#FFFFFF',
    danger: appConfig.identity.colors.danger,
    heroOverlayEnd: 'rgba(10, 10, 10, 0.88)',
    heroOverlayStart: 'rgba(10, 10, 10, 0.12)',
    inputBackground: '#FFFFFF',
    inputLine: appConfig.identity.colors.neutral100,
    mutedSurface: appConfig.identity.colors.neutral50,
    placeholder: appConfig.identity.colors.neutral300,
    primary: appConfig.identity.colors.primary,
    primaryGradientEnd: appConfig.identity.colors.primaryGradientEnd,
    primaryStrong: appConfig.identity.colors.primaryGradientEnd,
    sheetHandle: appConfig.identity.colors.neutral200,
    sheetSurface: '#FFFFFF',
    surface: '#FFFFFF',
    taskSurface: appConfig.identity.colors.neutral50,
    text: appConfig.identity.colors.neutral900,
    textSecondary: appConfig.identity.colors.neutral400,
    white: '#FFFFFF',
    black: '#000000',
  },
  isDark: false,
  statusBarStyle: 'dark' as const,
};

const darkTheme: AppTheme = {
  ...sharedTheme,
  colors: {
    avatarSurface: appConfig.identity.colors.neutral700,
    background: appConfig.identity.colors.neutral800,
    backgroundStrong: appConfig.identity.colors.neutral900,
    backdrop: 'rgba(0, 0, 0, 0.48)',
    border: appConfig.identity.colors.neutral600,
    buttonText: appConfig.identity.colors.neutral0,
    contrastSurface: '#FFFFFF',
    contrastText: appConfig.identity.colors.neutral900,
    danger: appConfig.identity.colors.danger,
    heroOverlayEnd: 'rgba(10, 10, 10, 0.9)',
    heroOverlayStart: 'rgba(10, 10, 10, 0.15)',
    inputBackground: appConfig.identity.colors.neutral800,
    inputLine: appConfig.identity.colors.neutral600,
    mutedSurface: appConfig.identity.colors.neutral700,
    placeholder: appConfig.identity.colors.neutral500,
    primary: appConfig.identity.colors.primary,
    primaryGradientEnd: appConfig.identity.colors.primaryGradientEnd,
    primaryStrong: appConfig.identity.colors.primaryGradientEnd,
    sheetHandle: appConfig.identity.colors.neutral500,
    sheetSurface: appConfig.identity.colors.neutral700,
    surface: appConfig.identity.colors.neutral800,
    taskSurface: appConfig.identity.colors.neutral700,
    text: appConfig.identity.colors.neutral0,
    textSecondary: appConfig.identity.colors.neutral300,
    white: '#FFFFFF',
    black: '#000000',
  },
  isDark: true,
  statusBarStyle: 'light' as const,
};

export const getTheme = (colorScheme: ColorSchemeName): AppTheme => (colorScheme === 'dark' ? darkTheme : lightTheme);
