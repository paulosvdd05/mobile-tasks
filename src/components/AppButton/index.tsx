import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { ActivityIndicator, Pressable, Text, ViewStyle } from "react-native";

import { useAppTheme } from "../../hooks";
import { useAppButtonStyles } from "./styles";

interface AppButtonProps {
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "light" | "contrast" | "danger";
}

export const AppButton: FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  fullWidth = true,
}) => {
  const theme = useAppTheme();
  const styles = useAppButtonStyles(theme);
  const isInactive = disabled || loading;
  const isPrimary = variant === "primary";
  const isLight = variant === "light";
  const isContrast = variant === "contrast";
  const isDanger = variant === "danger";

  const containerStyle: ViewStyle[] = [styles.button, styles[variant]];

  if (fullWidth) {
    containerStyle.push(styles.fullWidth);
  }

  if (isInactive) {
    containerStyle.push(styles.disabled);
  }

  return (
    <Pressable
      disabled={isInactive}
      onPress={onPress}
      style={({ pressed }) => [
        containerStyle,
        pressed && !isInactive && styles.pressed,
      ]}
    >
      {isPrimary ? (
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryGradientEnd]}
          end={{ x: 1, y: 0.5 }}
          start={{ x: 0, y: 0.5 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.buttonText} />
          ) : (
            <Text style={[styles.text, styles.primaryText]}>{title}</Text>
          )}
        </LinearGradient>
      ) : loading ? (
        <ActivityIndicator
          color={
            isLight
              ? theme.colors.black
              : isContrast
                ? theme.colors.contrastText
                : isDanger
                  ? theme.colors.white
                : theme.colors.primary
          }
        />
      ) : (
        <Text
          style={[
            styles.text,
            isLight
              ? styles.buttonText
              : isContrast
                ? styles.contrastText
                : isDanger
                  ? styles.dangerText
                : styles.secondaryText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};
