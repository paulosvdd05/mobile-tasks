import { FC, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../../hooks';
import { useScreenContainerStyles } from './styles';

interface ScreenContainerProps {
  children: ReactNode;
}

export const ScreenContainer: FC<ScreenContainerProps> = ({ children }) => {
  const theme = useAppTheme();
  const styles = useScreenContainerStyles(theme);

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};
