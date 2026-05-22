import { StyleSheet } from 'react-native';

import { theme } from '../../config';

export const useHomeStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
      padding: theme.spacing.lg,
    },
    content: {
      alignSelf: 'center',
      gap: theme.spacing.md,
      maxWidth: 520,
      width: '100%',
    },
    eyebrow: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    title: {
      color: theme.colors.text,
      fontSize: 34,
      fontWeight: '800',
      lineHeight: 40,
    },
  });
