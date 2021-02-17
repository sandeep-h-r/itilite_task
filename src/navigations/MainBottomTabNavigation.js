import React, {useEffect} from 'react';
import {StyleSheet, BackHandler, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import NewsLetter from '../screens/NewsLetter';
import {normalize} from '../constants/Platform';
import ItIcons from '../elements/ItIcons';

const BottomTab = createBottomTabNavigator();

export default function MainBottomTabNavigation(props) {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit the application?',
        [
          {
            text: 'CANCEL',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'OK', onPress: () => BackHandler.exitApp()},
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName={'Home'}
      activeColor="red"
      inactiveColor="black"
      shifting={true}
      barStyle={{
        backgroundColor: COLORS.PRIMARY,
      }}
      tabBarOptions={{
        activeTintColor: COLORS.PRIMARY,
        tabStyle: {padding: normalize(10)},
        style: {
          height: normalize(60),
          alignItems: 'center',
        },
        labelStyle: {fontSize: normalize(11)},
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <ItIcons
              size={normalize(35)}
              type={'MaterialCommunityIcons'}
              name={'home'}
              style={[
                {
                  color: focused ? COLORS.PRIMARY : COLORS.BLACK,
                },
              ]}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Newsletter"
        component={NewsLetter}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <ItIcons
              size={normalize(35)}
              type={'MaterialCommunityIcons'}
              name={'newspaper-variant-outline'}
              style={[
                {
                  color: focused ? COLORS.PRIMARY : COLORS.BLACK,
                },
              ]}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: normalize(16),
    height: normalize(16),
  },
});
