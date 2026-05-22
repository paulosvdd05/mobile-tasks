import { FC } from 'react';
import { Text, View } from 'react-native';

import { useAppTheme } from '../../hooks';
import { useAvatarBadgeStyles } from './styles';

interface AvatarBadgeProps {
  initials: string;
  size?: 'lg' | 'sm';
}

export const AvatarBadge: FC<AvatarBadgeProps> = ({ initials, size = 'sm' }) => {
  const theme = useAppTheme();
  const styles = useAvatarBadgeStyles(theme);
  const isLarge = size === 'lg';

  return (
    <View style={[styles.container, isLarge ? styles.largeContainer : styles.smallContainer]}>
      <Text style={[styles.label, isLarge ? styles.largeLabel : styles.smallLabel]}>{initials}</Text>
    </View>
  );
};
