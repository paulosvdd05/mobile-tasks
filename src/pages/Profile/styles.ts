import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useProfileStyles = (theme: AppTheme) =>
  StyleSheet.create({
    backButton: {
      alignItems: 'center',
      height: 28,
      justifyContent: 'center',
      width: 28,
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
      paddingBottom: theme.spacing.md,
    },
    email: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.sm,
      lineHeight: 20,
      textAlign: 'center',
    },
    footer: {
      paddingBottom: theme.spacing.sm,
    },
    identityCopy: {
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    identitySection: {
      alignItems: 'center',
      gap: theme.spacing.lg,
      paddingTop: 56,
    },
    name: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.bold,
      fontSize: theme.typography.sizes.md,
      lineHeight: 24,
      textAlign: 'center',
    },
    topSection: {
      gap: theme.spacing.xl,
    },
  });
