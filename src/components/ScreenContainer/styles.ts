import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useScreenContainerStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
  });
