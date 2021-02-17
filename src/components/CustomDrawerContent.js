import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {COLORS} from '../constants/Colors';
import ItIcons from '../elements/ItIcons';
import ItView from '../elements/ItView';
import {normalize} from '../constants/Platform';
import ItText from '../elements/ItText';
import store from '../services/storageServices';
import {launchImageLibrary} from 'react-native-image-picker';
import * as homeAction from '../actions/homeAction';
import {capitalize} from '../utils/common';

export default function DrawerContent(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [profilePic, setprofilePic] = useState('');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await store.get('userDetails');
    setEmail(userData.email);
    setprofilePic(userData.profilePic);
  };

  const uploadPicture = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      async (response) => {
        if (response && response.didCancel) {
          console.log('cancelled');
        } else {
          setprofilePic(response.uri);
          const userDetail = await store.get('userDetails');
          await store.save('userDetails', {
            ...userDetail,
            ...{profilePic: response.uri},
          });
          dispatch(homeAction.saveProfilePic(response.uri));
        }
      },
    );
  };
  return (
    <DrawerContentScrollView {...props}>
      <ItView style={styles.drawerContent}>
        <ItView style={styles.userInfoSection}>
          <TouchableOpacity onPress={uploadPicture} style={styles.drawerImage}>
            {profilePic ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: profilePic,
                }}
              />
            ) : (
              <ItView style={[styles.avatar, styles.noImage]}>
                <ItText>
                  {email.split('@', 1)[0].substring(0, 2).toUpperCase()}
                </ItText>
              </ItView>
            )}
            <ItText type={'Caption'}>{'Click to change image'}</ItText>
          </TouchableOpacity>
          <ItText style={styles.title}>
            {capitalize(email.split('@', 1)[0])}
          </ItText>
        </ItView>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            activeBackgroundColor={COLORS.PRIMARY}
            inactiveBackgroundColor={COLORS.PRIMARY}
            inactiveTintColor={COLORS.WHITE}
            icon={({color, size, focused}) => (
              <ItIcons
                size={normalize(25)}
                type={'MaterialIcons'}
                name={'home'}
                style={[
                  {
                    color: focused ? COLORS.PRIMARY : COLORS.WHITE,
                  },
                ]}
              />
            )}
            label="Home"
            labelStyle={styles.labelStyle}
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            activeBackgroundColor={COLORS.PRIMARY}
            inactiveBackgroundColor={COLORS.TRANSPARENT}
            inactiveTintColor={COLORS.BLACK}
            icon={({color, size, focused}) => (
              <ItIcons
                size={normalize(25)}
                type={'MaterialIcons'}
                name={'search'}
                style={[
                  {
                    color: focused ? COLORS.PRIMARY : COLORS.BLACK,
                  },
                ]}
              />
            )}
            label="Browse"
            labelStyle={styles.labelStyle}
            onPress={() => {
              props.navigation.navigate('WebSearch');
            }}
          />
          <DrawerItem
            activeBackgroundColor={COLORS.PRIMARY}
            inactiveBackgroundColor={COLORS.TRANSPARENT}
            inactiveTintColor={COLORS.BLACK}
            icon={({color, size, focused}) => (
              <ItIcons
                size={normalize(25)}
                type={'MaterialIcons'}
                name={'logout'}
                style={[
                  {
                    color: focused ? COLORS.PRIMARY : COLORS.BLACK,
                  },
                ]}
              />
            )}
            label="Logout"
            labelStyle={styles.labelStyle}
            onPress={async () => {
              await store
                .clear()
                .then((res) => {
                  if (res === null) {
                    props.navigation.reset({
                      index: 0,
                      routes: [{name: 'UserDetails'}],
                    });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              // props.navigation.navigate('WebSearch');
            }}
            style={{marginTop: normalize(100)}}
          />
        </Drawer.Section>
      </ItView>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginTop: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: normalize(5),
    fontWeight: 'bold',
  },
  drawerSection: {
    marginTop: normalize(15),
  },
  avatar: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(25),
  },
  noImage: {
    backgroundColor: COLORS.SECONDARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    marginLeft: normalize(-15),
  },
});
