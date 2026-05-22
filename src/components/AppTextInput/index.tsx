import { FC } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { useAppTheme } from '../../hooks';
import { useAppTextInputStyles } from './styles';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  variant?: 'filled' | 'minimal';
}

export const AppTextInput: FC<AppTextInputProps> = ({ label, errorMessage, variant = 'filled', ...props }) => {
  const theme = useAppTheme();
  const styles = useAppTextInputStyles(theme);
  const isMinimal = variant === 'minimal';

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={[styles.label, isMinimal && styles.labelMinimal]}>{label}</Text> : null}
      <TextInput
        {...props}
        autoCorrect={false}
        placeholderTextColor={theme.colors.placeholder}
        selectionColor={theme.colors.primary}
        style={[styles.input, isMinimal ? styles.inputMinimal : styles.inputFilled, errorMessage && (isMinimal ? styles.inputMinimalError : styles.inputFilledError)]}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
    </View>
  );
};
