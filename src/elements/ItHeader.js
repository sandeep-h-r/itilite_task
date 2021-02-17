import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import ItView from './ItView';
import {AppBarHeight, StatusBarHeight, normalize} from '../constants/Platform';
import {COLORS} from '../constants/Colors';
import ItText from './ItText';
import ItIcons from './ItIcons';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

export default function ItHeader(props) {
  const {
    backButton,
    onbackButtonPress,
    onhomeButtonPress,
    homeButton,
    title,
    headerStyle,
    backButtonStyle,
    homeButtonStyle,
    subTitle,
    headertitleStyle,
  } = props;
  const navigation = useNavigation();
  return (
    <ItView style={[styles.container, headerStyle]}>
      <ItView
        style={[styles.innerContainer, styles.transparentColor, headerStyle]}>
        {homeButton ? (
          <ItIcons
            size={normalize(30)}
            type={'MaterialIcons'}
            name={'menu'}
            style={[styles.homeButton, homeButtonStyle]}
            onPress={() =>
              onhomeButtonPress
                ? onhomeButtonPress()
                : navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
        ) : null}
        {backButton ? (
          <ItIcons
            size={normalize(24)}
            type={'AntDesign'}
            name={'arrowleft'}
            style={[styles.backButton, backButtonStyle]}
            onPress={() =>
              onbackButtonPress ? onbackButtonPress() : navigation.goBack()
            }
          />
        ) : null}
      </ItView>

      <ItView
        style={[styles.titlecontainer, styles.transparentColor, headerStyle]}>
        {title ? (
          <ItText type={'Subheading'} style={[styles.title, headertitleStyle]}>
            {title}
          </ItText>
        ) : null}
        {subTitle ? (
          <ItText type={'Caption'} style={styles.subTitle}>
            {subTitle}
          </ItText>
        ) : null}
      </ItView>
    </ItView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  titlecontainer: {
    flex: 1,
    marginHorizontal: normalize(8),
  },
  subTitle: {
    lineHeight: normalize(12),
  },
  container: {
    alignSelf: 'stretch',
    height: AppBarHeight() + StatusBarHeight(),
    paddingTop: Platform.OS === 'ios' ? normalize(24) : 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  innerContainer: {
    flex: 0.2,
    alignItems: 'flex-start',
  },
  transparentColor: {
    backgroundColor: COLORS.TRANSPARENT,
  },
  backButton: {
    color: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalize(8),
  },
  homeButton: {
    color: COLORS.WHITE,
    justifyContent: 'flex-end',
    paddingHorizontal: normalize(8),
    alignItems: 'center',
  },
});
