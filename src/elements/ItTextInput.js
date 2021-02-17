import React from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import {normalize} from '../constants/Platform';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/Fonts';

export default function ItTextInput(props) {
  return (
    <View style={[styles.container, props.style]}>
      {props.label ? (
        <Text style={[styles.label, styles.labelTop]}>{props.label}</Text>
      ) : null}
      <View
        style={{
          maxHeight: normalize(80),
        }}>
        <ScrollView nestedScrollEnabled>{props.topElement}</ScrollView>
      </View>

      <View style={styles.inputBox}>
        {props.leftElement ? (
          <View style={styles.leftElement}>{props.leftElement}</View>
        ) : null}

        <TextInput
          {...props}
          style={[styles.input, props.inputStyle]}
          keyboardType={props.keyboardType}
          onChangeText={(value) => {
            props.onChangeText(value);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(6),
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.CAPTION,
    paddingVertical: normalize(6),
    paddingHorizontal: normalize(6),
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    marginLeft: normalize(12),
  },
  leftElement: {
    marginLeft: normalize(6),
    maxWidth: '70%',
  },
  label: {
    position: 'absolute',
    borderRadius: normalize(4),
    backgroundColor: COLORS.WHITE,
    marginHorizontal: normalize(16),
    color: COLORS.BLACK,
    fontSize: normalize(12),
    paddingHorizontal: normalize(8),
    fontFamily: FONTS.REGULAR,
  },
  labelTop: {
    top: -10,
  },
});
