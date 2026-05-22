import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useAvatarBadgeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.avatarSurface,
      borderRadius: theme.radius.pill,
      justifyContent: 'center',
    },
    label: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.families.bold,
    },
    largeContainer: {
      height: 116,
      width: 116,
    },
    largeLabel: {
      fontSize: theme.typography.sizes.xxl,
    },
    smallContainer: {
      height: 34,
      width: 34,
    },
    smallLabel: {
      fontSize: theme.typography.sizes.sm,
    },
  });
