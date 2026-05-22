import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useTaskListItemStyles = (theme: AppTheme) =>
  StyleSheet.create({
    checkbox: {
      alignItems: 'center',
      borderColor: theme.colors.border,
      borderRadius: 8,
      borderWidth: 1.5,
      height: 20,
      justifyContent: 'center',
      width: 20,
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    deleteAction: {
      alignItems: 'center',
      backgroundColor: theme.colors.danger,
      borderRadius: 16,
      height: '100%',
      justifyContent: 'center',
      minHeight: 52,
      width: 50,
    },
    label: {
      color: theme.colors.text,
      flex: 1,
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.sm,
    },
    labelChecked: {
      color: theme.colors.textSecondary,
      textDecorationLine: 'line-through',
    },
    rightActionContainer: {
      justifyContent: 'center',
      marginLeft: theme.spacing.sm,
    },
    row: {
      alignItems: 'center',
      backgroundColor: theme.colors.taskSurface,
      borderRadius: 16,
      flexDirection: 'row',
      gap: theme.spacing.sm,
      minHeight: 52,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
  });
