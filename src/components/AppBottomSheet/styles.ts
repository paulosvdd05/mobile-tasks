import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useAppBottomSheetStyles = (theme: AppTheme) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.backdrop,
    },
    handle: {
      alignSelf: 'center',
      backgroundColor: theme.colors.sheetHandle,
      borderRadius: theme.radius.pill,
      height: 4,
      marginBottom: theme.spacing.lg,
      width: 38,
    },
    sheet: {
      backgroundColor: theme.colors.sheetSurface,
      borderTopLeftRadius: theme.radius.lg,
      borderTopRightRadius: theme.radius.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.lg,
    },
    wrapper: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });
