import { FC } from 'react';
import { Text, View } from 'react-native';

import { useWelcomeCardStyles } from './styles';

interface WelcomeCardProps {
  title: string;
  subtitle: string;
}

export const WelcomeCard: FC<WelcomeCardProps> = ({ title, subtitle }) => {
  const styles = useWelcomeCardStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>START</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};
