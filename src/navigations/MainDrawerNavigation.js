import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {normalize} from '../constants/Platform';
import MainBottomTabNavigation from './MainBottomTabNavigation';
import CustomSidebarMenu from '../components/CustomDrawerContent';
import {COLORS} from '../constants/Colors';
const Drawer = createDrawerNavigator();

export default function MainDrawerNavigation(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      openByDefault={false}
      drawerContent={() => <CustomSidebarMenu {...props} />}
      drawerStyle={styles.drawerStyle}
      drawerType={'back'}
      drawerContentOptions={{
        itemStyle: {marginVertical: normalize(8)},
      }}>
      <Drawer.Screen name="Home" component={MainBottomTabNavigation} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: COLORS.WHITE,
    borderTopRightRadius: normalize(8),
    borderBottomRightRadius: normalize(8),
    width: '65%',
  },
});
