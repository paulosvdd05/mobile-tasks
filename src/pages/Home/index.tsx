import { Text, View } from 'react-native';

import { WelcomeCard } from '../../components';
import { useAppInitialization } from '../../hooks';
import { useAppSelector } from '../../store';
import { formatStartupTime } from '../../utils';
import { useHomeStyles } from './styles';

export const Home = () => {
  const styles = useHomeStyles();
  const initializedAt = useAppSelector(state => state.app.initializedAt);

  useAppInitialization();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Teste</Text>

        <WelcomeCard
          title='Teste componente card'
          subtitle={
            initializedAt
              ? `Teste redux: ${formatStartupTime(initializedAt)}.`
              : 'Carregando redux...'
          }
        />

      </View>
    </View>
  );
};
