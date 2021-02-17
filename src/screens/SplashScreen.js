import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import {normalize} from '../constants/Platform';
import ItText from '../elements/ItText';
import ItView from '../elements/ItView';
import store from '../services/storageServices';

export default function SplashScreen(props) {
  useEffect(() => {
    setTimeout(() => {
      getUserData();
    }, 3000);
  }, []);

  const getUserData = async () => {
    const userDetail = await store.get('userDetails');
    if (userDetail && userDetail.name && userDetail.email) {
      props.navigation.navigate('Main');
    } else {
      props.navigation.navigate('UserDetails');
    }
  };
  return (
    <ItView style={styles.container}>
      <ItText type={'Text'} style={styles.title}>
        ITILITE
      </ItText>
    </ItView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  title: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
});
