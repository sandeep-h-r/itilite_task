import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../constants/Colors';
import {normalize, dim} from '../constants/Platform';
import ItText from '../elements/ItText';
import ItTextInput from '../elements/ItTextInput';
import ItToast from '../elements/ItToast';
import ItView from '../elements/ItView';
import {validateEmail} from '../utils/common';
import store from '../services/storageServices';
import itilite_logo from '../assets/itilite_logo.png';

export default function UserDetails(props) {
  const [state, setstate] = useState({
    email: '',
    profilePic: '',
  });

  const handleChange = (key) => (value) => {
    setstate({
      ...state,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    if (state.email && validateEmail(state.email)) {
      await store.save('userDetails', state);
      props.navigation.navigate('Main');
    } else if (!state.email || !validateEmail(state.email)) {
      ItToast({
        message: 'Please enter a valid EmailID',
        duration: 'SHORT',
        position: 'CENTER',
      });
    } else {
      ItToast({
        message: 'Please enter a valid user details',
        duration: 'SHORT',
        position: 'CENTER',
      });
    }
  };
  return (
    <ItView style={styles.container}>
      <Image source={itilite_logo} style={styles.image} />
      <ItText>Please enter the Email ID</ItText>
      <ItTextInput
        label={'Email ID*'}
        placeholder={'Enter the Email'}
        value={state.email}
        keyboardType="email-address"
        onChangeText={handleChange('email')}
        style={{
          marginVertical: normalize(20),
          marginHorizontal: normalize(25),
          width: dim().width * 0.9,
        }}
      />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
        <ItText style={styles.buttonText}>Submit</ItText>
      </TouchableOpacity>
    </ItView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  button: {
    backgroundColor: COLORS.SECONDARY,
    paddingHorizontal: normalize(40),
    paddingVertical: normalize(10),
    borderRadius: normalize(10),
  },
  buttonText: {
    color: COLORS.BLACK,
  },
  image: {
    width: dim().width * 0.4,
    height: normalize(40),
    resizeMode: 'contain',
    marginBottom: normalize(50),
  },
});
