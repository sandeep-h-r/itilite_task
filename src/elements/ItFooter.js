import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import ItView from './ItView';
import {AppBarHeight, StatusBarHeight, normalize} from '../constants/Platform';

export default function ItFooter(props) {
  const {children, style} = props;
  return <ItView style={[styles.container, style]}>{children}</ItView>;
}
const styles = StyleSheet.create({
  container: {
    height: AppBarHeight() + StatusBarHeight(),
    paddingTop: Platform.OS === 'ios' ? normalize(24) : 0,
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
