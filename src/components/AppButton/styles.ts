import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useAppButtonStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      borderRadius: theme.radius.pill,
      justifyContent: 'center',
      minHeight: 56,
      overflow: 'hidden',
      paddingHorizontal: theme.spacing.lg,
    },
    contrast: {
      backgroundColor: theme.colors.contrastSurface,
    },
    contrastText: {
      color: theme.colors.contrastText,
    },
    danger: {
      backgroundColor: theme.colors.danger,
    },
    dangerText: {
      color: theme.colors.white,
    },
    disabled: {
      opacity: 0.6,
    },
    fullWidth: {
      width: '100%',
    },
    gradient: {
      alignItems: 'center',
      borderRadius: theme.radius.pill,
      justifyContent: 'center',
      minHeight: 56,
      paddingHorizontal: theme.spacing.lg,
      width: '100%',
    },
    light: {
      backgroundColor: theme.colors.white,
    },
    buttonText: {
      color: theme.colors.black,
    },
    pressed: {
      transform: [{ scale: 0.99 }],
    },
    primary: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 0,
    },
    primaryText: {
      color: theme.colors.buttonText,
    },
    secondary: {
      backgroundColor: theme.colors.mutedSurface,
      borderColor: theme.colors.border,
      borderWidth: 1,
      paddingHorizontal: theme.spacing.lg,
    },
    secondaryText: {
      color: theme.colors.primary,
    },
    text: {
      fontFamily: theme.typography.families.semiBold,
      fontSize: theme.typography.sizes.md,
    },
  });
