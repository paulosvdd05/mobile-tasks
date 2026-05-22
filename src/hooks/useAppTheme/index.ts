import { useColorScheme } from 'react-native';

import { getTheme } from '../../config';

export const useAppTheme = () => getTheme(useColorScheme());
