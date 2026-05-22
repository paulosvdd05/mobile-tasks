import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useAppTextInputStyles = (theme: AppTheme) =>
  StyleSheet.create({
    errorMessage: {
      color: theme.colors.danger,
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.sm,
      marginTop: theme.spacing.xs,
    },
    input: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.md,
      minHeight: 54,
    },
    inputFilled: {
      backgroundColor: theme.colors.inputBackground,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    inputFilledError: {
      borderColor: theme.colors.danger,
    },
    inputMinimal: {
      backgroundColor: 'transparent',
      borderRadius: 0,
      fontSize: theme.typography.sizes.lg,
      minHeight: 44,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    inputMinimalError: {
      borderBottomColor: theme.colors.danger,
      borderBottomWidth: 1,
    },
    label: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.medium,
      fontSize: theme.typography.sizes.sm,
      marginBottom: theme.spacing.xs,
    },
    labelMinimal: {
      color: theme.colors.textSecondary,
      marginBottom: 2,
    },
    wrapper: {
      width: '100%',
    },
  });
