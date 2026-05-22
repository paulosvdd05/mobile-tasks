import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import { AppButton } from '../../components';
import { routes } from '../../constants';
import { useAppTheme } from '../../hooks';
import { RootStackParamList } from '../../types/navigation';
import { useOnboardingStyles } from './styles';

type OnboardingScreenProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export const Onboarding = ({ navigation }: OnboardingScreenProps) => {
  const theme = useAppTheme();
  const styles = useOnboardingStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar style='light' />

      <ImageBackground source={require('../../assets/images/onboarding-background.png')} style={styles.background} imageStyle={styles.backgroundImage}>
        <LinearGradient colors={[theme.colors.heroOverlayStart, theme.colors.heroOverlayEnd]} locations={[0.2, 1]} style={styles.overlay}>
          <View style={styles.spacer} />

          <View style={styles.content}>
            <Text style={styles.title}>Organize sua rotina</Text>
            <Text style={styles.subtitle}>Gerencie suas tarefas de forma simples, rapida e inteligente.</Text>

            <View style={styles.actions}>
              <AppButton onPress={() => navigation.navigate(routes.auth.name, { mode: 'signUp' })} title='Criar conta' variant='light' />

              <Pressable onPress={() => navigation.navigate(routes.auth.name, { mode: 'signIn' })} style={styles.secondaryAction}>
                <Text style={styles.secondaryActionText}>Ja tenho uma conta</Text>
              </Pressable>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};
