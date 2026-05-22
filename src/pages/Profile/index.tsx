import { Feather } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppButton, AvatarBadge, ScreenContainer } from '../../components';
import { routes } from '../../constants';
import { useAppTheme, useAuth } from '../../hooks';
import { useAppSelector } from '../../store';
import { RootStackParamList } from '../../types/navigation';
import { getInitials } from '../../utils';
import { useProfileStyles } from './styles';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const Profile = ({ navigation }: ProfileScreenProps) => {
  const theme = useAppTheme();
  const styles = useProfileStyles(theme);
  const { signOut } = useAuth();
  const user = useAppSelector(state => state.session.user);

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Pressable
            onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate(routes.dashboard.name))}
            style={styles.backButton}
          >
            <Feather color={theme.colors.text} name='chevron-left' size={20} />
          </Pressable>

          <View style={styles.identitySection}>
            <AvatarBadge initials={getInitials(user?.name ?? 'Usuario') || 'U'} size='lg' />
            <View style={styles.identityCopy}>
              <Text style={styles.name}>{user?.name ?? 'Usuario'}</Text>
              <Text style={styles.email}>{user?.email ?? 'sem-email@exemplo.com'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <AppButton onPress={signOut} title='Sair' variant='danger' />
        </View>
      </View>
    </ScreenContainer>
  );
};
