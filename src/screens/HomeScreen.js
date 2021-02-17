import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, ScrollView, Image, RefreshControl} from 'react-native';
import ItContainer from '../elements/ItContainer';
import ItView from '../elements/ItView';
import ItText from '../elements/ItText';
import moment from 'moment';

import * as homeAction from '../actions/homeAction';
import {normalize} from '../constants/Platform';
import WeatherCard from '../components/WeatherCard';
import {COLORS} from '../constants/Colors';
import store from '../services/storageServices';
import {capitalize} from '../utils/common';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const picData = useSelector((state) => state.home.saveProfilePic);
  const [profilePic, setprofilePic] = useState('');
  const isLoading = useSelector((state) => state.home.fetchingData);

  useEffect(() => {
    getUserData();
    get_weatherData();
  }, [picData]);

  const getUserData = async () => {
    const userData = await store.get('userDetails');
    setName(userData.name);
    setprofilePic(userData.profilePic);
  };

  const get_weatherData = async () => {
    dispatch(homeAction.isLoading());
    const params = {
      q: 'India,in',
      lat: '0',
      lon: '0',
      id: '2172797',
      lang: 'en',
      units: 'metric',
    };
    await dispatch(homeAction.getWeatherData(params));
  };

  const weatherData = useSelector((state) => state.home.weatherData);

  const onRefresh = () => {
    get_weatherData();
  };

  return (
    <ItContainer title={'Dashboard'} homeButton noFooter loader={isLoading}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={isLoading}
            color={COLORS.PRIMARY}
            enabled={true}
          />
        }>
        <ItView style={styles.titlecard}>
          <ItView>
            <ItText type={'Text'} style={styles.dateText}>
              {moment().format('MMM DD, YYYY')}
            </ItText>
            <ItText>{capitalize(name)}</ItText>
          </ItView>
          <ItView>
            {profilePic ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: profilePic,
                }}
              />
            ) : (
              <ItView style={[styles.avatar, styles.noImage]}>
                <ItText>{name.substring(0, 2).toUpperCase()}</ItText>
              </ItView>
            )}
          </ItView>
        </ItView>
        <ItView style={styles.rowCard}>
          <ItView style={styles.colCard}>
            <WeatherCard
              dt={weatherData.dt}
              type="Humidity"
              value={
                (weatherData &&
                  weatherData.main &&
                  weatherData.main.humidity) ||
                'No Data'
              }
            />
            <WeatherCard
              dt={weatherData.dt}
              type="Visibility"
              value={(weatherData && weatherData.visibility) || 'No Data'}
            />

            <WeatherCard
              dt={weatherData.dt}
              type="Wind"
              value={(weatherData && weatherData.wind) || 'No Data'}
            />
            <WeatherCard
              dt={weatherData.dt}
              type="Sunrise"
              value={
                (weatherData &&
                  weatherData.sys &&
                  moment
                    .unix(weatherData.sys.sunrise)
                    .utcOffset('+0530')
                    .format('hh:mm A')) ||
                'No Data'
              }
            />
            <WeatherCard
              dt={weatherData.dt}
              type="Ground Level"
              value={
                (weatherData &&
                  weatherData.main &&
                  weatherData.main.grnd_level) ||
                'No Data'
              }
            />
          </ItView>
          <ItView style={styles.colCard}>
            <WeatherCard
              dt={weatherData.dt}
              type="Pressure"
              value={
                (weatherData &&
                  weatherData.main &&
                  weatherData.main.pressure) ||
                'No Data'
              }
            />
            <WeatherCard
              dt={weatherData.dt}
              type="Temperature"
              value={
                {
                  temp:
                    weatherData && weatherData.main && weatherData.main.temp,
                  temp_max:
                    weatherData &&
                    weatherData.main &&
                    weatherData.main.temp_max,
                  temp_min:
                    weatherData &&
                    weatherData.main &&
                    weatherData.main.temp_min,
                } || 'No Data'
              }
            />
            <WeatherCard
              dt={weatherData.dt}
              type="Sunset"
              value={
                (weatherData &&
                  weatherData.sys &&
                  moment
                    .unix(weatherData.sys.sunset)
                    .utcOffset('+0530')
                    .format('hh:mm A')) ||
                'No Data'
              }
            />
            <WeatherCard
              dt={weatherData.dt}
              type="Sea Level"
              value={
                (weatherData &&
                  weatherData.main &&
                  weatherData.main.sea_level) ||
                'No Data'
              }
            />
          </ItView>
        </ItView>
      </ScrollView>
    </ItContainer>
  );
}

const styles = StyleSheet.create({
  titlecard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: normalize(20),
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
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: normalize(15),
  },
  colCard: {
    paddingVertical: normalize(10),
  },
  contentContainerStyle: {
    paddingBottom: normalize(150),
  },
  dateText: {
    fontSize: normalize(16),
    fontWeight: '700',
    color: COLORS.CAPTION,
  },
});
