import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import UserDetails from '../screens/UserDetails';
import MainDrawerNavigation from './MainDrawerNavigation';
import WebSearch from '../screens/WebSearch';

const Stack = createStackNavigator();

export default class MainContainer extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode={'SplashScreen'}
          initialRouteName={'SplashScreen'}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="UserDetails" component={UserDetails} />
          <Stack.Screen name="Main" component={MainDrawerNavigation} />
          <Stack.Screen name="WebSearch" component={WebSearch} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
