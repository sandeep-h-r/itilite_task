import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {COLORS} from '../constants/Colors';
import {dim, normalize} from '../constants/Platform';
import ItIcons from '../elements/ItIcons';
import ItText from '../elements/ItText';
import ItView from '../elements/ItView';
import moment from 'moment';

const WeatherItem = (type) => {
  switch (type) {
    case 'Humidity':
      return {
        iconType: 'Ionicons',
        iconname: 'water-outline',
        backgroundColor: COLORS.HUMIDITY,
        unit: '%',
      };
    case 'Pressure':
      return {
        iconType: 'MaterialCommunityIcons',
        iconname: 'clock-time-nine-outline',
        backgroundColor: COLORS.PRESSURE,
        unit: 'hPa',
        graphImage: require('../assets/Dummygraph.png'),
      };
    case 'Visibility':
      return {
        iconType: 'MaterialCommunityIcons',
        iconname: 'weather-sunset-up',
        backgroundColor: COLORS.VISIBILITY,
        unit: 'meter',
        graphImage: require('../assets/Dummygraph.png'),
      };
    case 'Temperature':
      return {
        iconType: 'MaterialCommunityIcons',
        iconname: 'coolant-temperature',
        backgroundColor: COLORS.TEMPERATURE,
        unit: '\u2103',
      };
    case 'Wind':
      return {
        iconType: 'Entypo',
        iconname: 'air',
        backgroundColor: COLORS.WIND,
        unitDeg: 'degrees',
        unitSpeed: 'meter/sec',
      };
    case 'Sea Level':
      return {
        iconType: 'Foundation',
        iconname: 'mountains',
        backgroundColor: COLORS.SEALEVEL,
        unit: 'hPa',
      };
    case 'Ground Level':
      return {
        iconType: 'MaterialCommunityIcons',
        iconname: 'island',
        backgroundColor: COLORS.GROUNDLEVEL,
        unit: 'hPa',
      };
    case 'Sunrise':
      return {
        iconType: 'Feather',
        iconname: 'sunrise',
        backgroundColor: COLORS.SUNRISE,
      };
    case 'Sunset':
      return {
        iconType: 'Feather',
        iconname: 'sunset',
        backgroundColor: COLORS.SUNSET,
      };
    default:
      return null;
  }
};

export default function WeatherCard(props) {
  const {type, value, dt} = props;
  const [timeAgo, settimeAgo] = useState('');

  useEffect(() => {
    let timeagoTimer = setInterval(() => {
      settimeAgo(moment.unix(dt).utc().fromNow());
    }, 1000);

    return () => clearInterval(timeagoTimer);
  }, []);

  return (
    <ItView
      style={[
        styles.container,
        {
          backgroundColor: WeatherItem(type).backgroundColor,
        },
      ]}>
      <ItIcons
        size={normalize(30)}
        type={WeatherItem(type).iconType}
        name={WeatherItem(type).iconname}
        style={[styles.icon]}
      />
      <ItText type={'Title'} style={{color: COLORS.WHITE}}>
        {type}
      </ItText>
      {WeatherItem(type).graphImage ? (
        <Image style={styles.image} source={WeatherItem(type).graphImage} />
      ) : null}
      {type === 'Wind' ? (
        <>
          <ItText type={'Headline'} style={{color: COLORS.WHITE}}>
            {`${value.deg} ${
              WeatherItem(type).unitDeg ? WeatherItem(type).unitDeg : ''
            }`}
          </ItText>
          <ItText type={'Headline'} style={{color: COLORS.WHITE}}>
            {`${value.speed} ${
              WeatherItem(type).unitSpeed ? WeatherItem(type).unitSpeed : ''
            }`}
          </ItText>
        </>
      ) : type === 'Temperature' ? (
        <>
          <ItText type={'Headline'} style={{color: COLORS.WHITE}}>
            {`Current: ${value.temp} ${
              WeatherItem(type).unit ? WeatherItem(type).unit : ''
            }`}
          </ItText>
          <ItText type={'Headline'} style={{color: COLORS.WHITE}}>
            {`Min: ${value.temp_min} ${
              WeatherItem(type).unit ? WeatherItem(type).unit : ''
            }`}
          </ItText>
          <ItText type={'Headline'} style={{color: COLORS.WHITE}}>
            {`Max: ${value.temp_max} ${
              WeatherItem(type).unit ? WeatherItem(type).unit : ''
            }`}
          </ItText>
        </>
      ) : (
        <ItText type={'Headline'} style={{color: COLORS.WHITE}}>
          {`${value} ${WeatherItem(type).unit ? WeatherItem(type).unit : ''}`}
        </ItText>
      )}
      <ItText type={'Subheading'} style={{color: COLORS.WHITE}}>
        {timeAgo}
      </ItText>
    </ItView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dim().width * 0.45,
    padding: normalize(15),
    borderRadius: normalize(10),
    marginBottom: normalize(12),
  },
  icon: {
    color: COLORS.WHITE,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: dim().width * 0.38,
    height: dim().height * 0.2,
    borderRadius: normalize(25),
    resizeMode: 'contain',
  },
});
