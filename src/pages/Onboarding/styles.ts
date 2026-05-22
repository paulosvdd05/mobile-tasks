import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useOnboardingStyles = (theme: AppTheme) =>
  StyleSheet.create({
    actions: {
      gap: theme.spacing.md,
      width: '100%',
    },
    background: {
      backgroundColor: theme.colors.backgroundStrong,
      flex: 1,
    },
    backgroundImage: {
      resizeMode: 'cover',
    },
    container: {
      backgroundColor: theme.colors.backgroundStrong,
      flex: 1,
    },
    content: {
      alignItems: 'center',
      gap: theme.spacing.md,
      paddingBottom: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
    },
    overlay: {
      flex: 1,
    },
    secondaryAction: {
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
    },
    secondaryActionText: {
      color: theme.colors.white,
      fontFamily: theme.typography.families.semiBold,
      fontSize: theme.typography.sizes.md,
    },
    spacer: {
      flex: 1,
      minHeight: 420,
    },
    subtitle: {
      color: 'rgba(250, 250, 250, 0.68)',
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.md,
      lineHeight: 28,
      maxWidth: 320,
      textAlign: 'center',
    },
    title: {
      color: theme.colors.white,
      fontFamily: theme.typography.families.extraBold,
      fontSize: theme.typography.sizes.xl,
      textAlign: 'center',
    },
  });
