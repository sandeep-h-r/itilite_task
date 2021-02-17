import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Text,
  Title,
  Subheading,
  Caption,
  Headline,
  Paragraph,
} from 'react-native-paper';
import {FONTS} from '../constants/Fonts';
import {normalize} from '../constants/Platform';
import {COLORS} from '../constants/Colors';

const renderView = (props) => {
  switch (props.type) {
    case 'Text':
      return (
        <Text
          numberOfLines={props.numberOfLines}
          ellipsizeMode={props.ellipsizeMode}
          style={props.style}>
          {props.children}
        </Text>
      );
    case 'Title':
      return (
        <Title style={[styles.title, props.style]}>{props.children}</Title>
      );
    case 'Subheading':
      return (
        <Subheading style={[styles.subheading, props.style]}>
          {props.children}
        </Subheading>
      );
    case 'Paragraph':
      return (
        <Paragraph style={[styles.paragraph, props.style]}>
          {props.children}
        </Paragraph>
      );
    case 'Headline':
      return (
        <Headline id={props.id} style={[styles.headline, props.style]}>
          {props.children}
        </Headline>
      );
    case 'Caption':
      return (
        <Caption {...props} style={[styles.caption, props.style]}>
          {props.children}
        </Caption>
      );
    case 'Body_1':
      return (
        <Text
          numberOfLines={props.numberOfLines}
          style={[styles.body1, props.style]}>
          {props.children}
        </Text>
      );
    case 'Body_2':
      return <Text style={[styles.body2, props.style]}>{props.children}</Text>;
    default:
      return (
        <Text style={[styles.default, props.style]}>{props.children}</Text>
      );
  }
};

const styles = StyleSheet.create({
  default: {
    fontFamily: FONTS.BOLD,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontSize: normalize(22),
  },
  body2: {
    fontFamily: FONTS.REGULAR,
    fontSize: normalize(16),
    fontWeight: '500',
    color: COLORS.BLACK,
    lineHeight: normalize(19),
  },
  body1: {
    fontFamily: FONTS.BOLD,
    fontSize: normalize(14),
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  title: {
    fontFamily: FONTS.REGULAR,
    fontWeight: '500',
    lineHeight: normalize(32),
    color: COLORS.BLACK,
    fontSize: normalize(20),
  },
  subheading: {
    fontFamily: FONTS.BOLD,
    fontSize: normalize(16),
    lineHeight: normalize(24),
    fontWeight: '800',
    color: COLORS.BLACK,
  },
  paragraph: {
    fontFamily: FONTS.REGULAR,
    fontSize: normalize(16),
    color: COLORS.BLACK,
    lineHeight: normalize(19),
    textAlign: 'justify',
  },
  headline: {
    fontFamily: FONTS.BOLD,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: normalize(25),
    fontSize: normalize(18),
    color: COLORS.BLACK,
  },
  caption: {
    fontFamily: FONTS.REGULAR,
    fontSize: normalize(12),
    color: COLORS.CAPTION,
  },
});

export default function ItText(props) {
  return renderView(props);
}
