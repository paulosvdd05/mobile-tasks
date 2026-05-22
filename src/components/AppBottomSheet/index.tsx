import { FC, ReactNode } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, View } from 'react-native';

import { useAppTheme } from '../../hooks';
import { useAppBottomSheetStyles } from './styles';

interface AppBottomSheetProps {
  children: ReactNode;
  onClose: () => void;
  visible: boolean;
}

export const AppBottomSheet: FC<AppBottomSheetProps> = ({ children, onClose, visible }) => {
  const theme = useAppTheme();
  const styles = useAppBottomSheetStyles(theme);

  return (
    <Modal animationType='fade' onRequestClose={onClose} presentationStyle='overFullScreen' transparent visible={visible}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrapper}>
        <Pressable onPress={onClose} style={styles.backdrop} />

        <View style={styles.sheet}>
          <View style={styles.handle} />
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
