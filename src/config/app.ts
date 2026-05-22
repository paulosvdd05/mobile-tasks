export const appConfig = {
  api: {
    baseUrl: 'https://api-teste-mobile.fly.dev',
  },
  identity: {
    appName: 'Tasks Segurali',
    colors: {
      black: '#000000',
      danger: '#FB2C36',
      neutral0: '#FAFAFA',
      neutral50: '#F5F5F5',
      neutral100: '#E5E5E5',
      neutral200: '#D4D4D4',
      neutral300: '#A1A1A1',
      neutral400: '#737373',
      neutral500: '#525252',
      neutral600: '#404040',
      neutral700: '#262626',
      neutral800: '#171717',
      neutral900: '#0A0A0A',
      primary: '#822DE6',
      primaryGradientEnd: '#9333EA',
    },
  },
  linking: {
    profilePath: 'perfil',
    scheme: 'testetecnico',
  },
  radius: {
    md: 18,
    lg: 28,
    pill: 999,
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  typography: {
    families: {
      bold: 'PlusJakartaSans_700Bold',
      extraBold: 'PlusJakartaSans_800ExtraBold',
      medium: 'PlusJakartaSans_500Medium',
      regular: 'PlusJakartaSans_400Regular',
      semiBold: 'PlusJakartaSans_600SemiBold',
    },
    sizes: {
      sm: 14,
      md: 16,
      lg: 20,
      xl: 28,
      xxl: 36,
    },
    weights: {
      medium: '500' as const,
      semiBold: '600' as const,
      bold: '700' as const,
      extraBold: '800' as const,
    },
  },
} as const;
