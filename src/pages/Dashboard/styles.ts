import { StyleSheet } from 'react-native';

import { AppTheme } from '../../config';

export const useDashboardStyles = (theme: AppTheme) =>
  StyleSheet.create({
    addButton: {
      borderRadius: theme.radius.pill,
      overflow: 'hidden',
    },
    addButtonGradient: {
      alignItems: 'center',
      borderRadius: theme.radius.pill,
      height: 32,
      justifyContent: 'center',
      width: 64,
    },
    avatarButton: {
      borderRadius: theme.radius.pill,
    },
    container: {
      flex: 1,
    },
    emptyState: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      minHeight: 280,
      paddingHorizontal: theme.spacing.xl,
    },
    emptyStateText: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.families.medium,
      fontSize: theme.typography.sizes.md,
      lineHeight: 24,
      textAlign: 'center',
    },
    footer: {
      alignItems: 'center',
      paddingBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.sm,
    },
    greeting: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.bold,
      fontSize: 18,
      lineHeight: 24,
    },
    header: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerCopy: {
      flex: 1,
      gap: 4,
      paddingRight: theme.spacing.md,
    },
    helperText: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.families.regular,
      fontSize: 12,
      lineHeight: 18,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      backgroundColor: theme.colors.backdrop,
      justifyContent: 'center',
    },
    loadingSpinner: {
      alignItems: 'center',
      height: 28,
      justifyContent: 'center',
      width: 28,
    },
    refreshButton: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderColor: theme.colors.primary,
      borderRadius: theme.radius.pill,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 6,
      minHeight: 32,
      paddingHorizontal: theme.spacing.sm,
    },
    refreshButtonDisabled: {
      opacity: 0.5,
    },
    refreshButtonError: {
      borderColor: theme.colors.danger,
    },
    refreshButtonPressed: {
      opacity: 0.8,
    },
    refreshButtonText: {
      color: theme.colors.primary,
      fontFamily: theme.typography.families.semiBold,
      fontSize: 12,
      lineHeight: 16,
    },
    refreshButtonTextError: {
      color: theme.colors.danger,
    },
    scrollContent: {
      flexGrow: 1,
      gap: theme.spacing.xl,
      paddingHorizontal: theme.spacing.lg,
      paddingTop: theme.spacing.md,
    },
    section: {
      gap: theme.spacing.sm,
    },
    sectionEmptyText: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.families.regular,
      fontSize: theme.typography.sizes.sm,
      lineHeight: 20,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.xs,
    },
    sections: {
      gap: theme.spacing.lg,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.medium,
      fontSize: 12,
      lineHeight: 16,
    },
    sheetCentered: {
      alignItems: 'center',
    },
    sheetContent: {
      gap: theme.spacing.lg,
      paddingBottom: theme.spacing.sm,
    },
    sheetSubtitle: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.families.regular,
      fontSize: 12,
      lineHeight: 18,
      textAlign: 'center',
    },
    sheetTitle: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.bold,
      fontSize: theme.typography.sizes.lg,
      lineHeight: 28,
    },
    sheetTitleCentered: {
      textAlign: 'center',
    },
    syncNotice: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.taskSurface,
      borderRadius: 16,
      flexDirection: 'row',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
    },
    syncNoticeCopy: {
      flex: 1,
    },
    syncNoticeError: {
      backgroundColor: theme.isDark ? 'rgba(251, 44, 54, 0.12)' : 'rgba(251, 44, 54, 0.08)',
    },
    syncNoticeText: {
      color: theme.colors.text,
      fontFamily: theme.typography.families.regular,
      fontSize: 12,
      lineHeight: 18,
    },
    syncNoticeTextError: {
      color: theme.colors.danger,
    },
    taskGroup: {
      gap: theme.spacing.sm,
    },
  });
