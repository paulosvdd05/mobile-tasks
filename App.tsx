import 'react-native-gesture-handler';

import { FC } from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppContent } from './src';
import { store } from './src/store';

const App: FC = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </SafeAreaProvider>
);

export default App;
