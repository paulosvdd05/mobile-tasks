import { StyleSheet } from 'react-native';

import { theme } from '../../config';

export const useWelcomeCardStyles = () =>
  StyleSheet.create({
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.primarySoft,
      borderRadius: theme.borderRadius.pill,
      color: theme.colors.primary,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1,
      marginBottom: theme.spacing.sm,
      overflow: 'hidden',
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 6,
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      gap: theme.spacing.sm,
      padding: theme.spacing.lg,
      width: '100%',
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: 15,
      lineHeight: 22,
    },
    title: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: '700',
    },
  });
