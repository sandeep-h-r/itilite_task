import React, {Component} from 'react';
import MainContainer from './navigations/index';
import {Provider} from 'react-redux';
import {store} from './store';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {COLORS} from './constants/Colors';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.PRIMARY,
    accent: COLORS.SECONDARY,
  },
};

class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <MainContainer />
        </Provider>
      </PaperProvider>
    );
  }
}

export default App;
