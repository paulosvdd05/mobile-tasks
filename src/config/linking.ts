import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { routes } from '../constants';
import { RootStackParamList } from '../types/navigation';
import { appConfig } from './app';

export const linking: LinkingOptions<RootStackParamList> = {
  config: {
    screens: {
      [routes.onboarding.name]: '',
      [routes.auth.name]: 'auth',
      [routes.dashboard.name]: 'inicio',
      [routes.profile.name]: routes.profile.path,
    },
  },
  prefixes: [Linking.createURL('/'), `${appConfig.linking.scheme}://`],
};
