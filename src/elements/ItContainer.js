import React from 'react';
import {StyleSheet} from 'react-native';
import ItView from './ItView';
import ItHeader from './ItHeader';
import ItFooter from './ItFooter';
import ItContent from './ItContent';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../constants/Colors';
import {dim} from '../constants/Platform';

export default function ItContainer(props) {
  const {
    noFooter,
    noHeader,
    scrollable,
    children,
    backButton,
    onhomeButtonPress,
    onbackButtonPress,
    title,
    homeButton,
    footerChildren,
    loader,
    subTitle,
    containerStyle,
    headertitleStyle,
    homeButtonStyle,
    backButtonStyle,
  } = props;
  return (
    <ItView style={styles.container}>
      {noHeader ? null : (
        <ItHeader
          backButton={backButton}
          homeButton={homeButton}
          title={title}
          subTitle={subTitle}
          headertitleStyle={headertitleStyle}
          onhomeButtonPress={onhomeButtonPress}
          onbackButtonPress={onbackButtonPress}
          homeButtonStyle={homeButtonStyle}
          backButtonStyle={backButtonStyle}
        />
      )}
      {loader ? (
        <ActivityIndicator
          size="large"
          animating={true}
          color={COLORS.PRIMARY}
          style={styles.loader}
        />
      ) : (
        <ItContent scrollable={scrollable} style={containerStyle}>
          {children}
        </ItContent>
      )}
      {noFooter ? null : <ItFooter>{footerChildren}</ItFooter>}
    </ItView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginTop: dim().height * 0.4,
  },
});
