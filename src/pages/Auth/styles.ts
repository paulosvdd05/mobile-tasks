import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useAuthStyles = (theme: AppTheme) =>
  StyleSheet.create({
    backButton: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      minHeight: 32,
      width: 32,
    },
    backButtonText: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.regular,
      fontSize: 24,
      lineHeight: 24,
    },
    formError: {
      color: theme.colors.danger,
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.sm,
      lineHeight: 20,
      textAlign: 'center',
    },
    fields: {
      gap: theme.spacing.sm,
    },
    flex: {
      flex: 1,
    },
    footer: {
      paddingBottom: theme.spacing.md,
    },
    heroCard: {
      gap: theme.spacing.sm,
    },
    screenContent: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.md,
      paddingTop: theme.spacing.md,
    },
    title: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.extraBold,
      fontSize: theme.typography.sizes.xl,
      lineHeight: 36,
    },
    topSection: {
      gap: 30,
      paddingTop: theme.spacing.sm,
    },
  });
