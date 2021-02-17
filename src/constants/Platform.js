import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const BASE_SCALE = width / guidelineBaseWidth;

export function isIos() {
  return Platform.OS === 'ios' ? true : false;
}

export function isWeb() {
  return Platform.OS === 'web' ? true : false;
}

export function dim() {
  return {width, height};
}

export function normalize(size) {
  const newSize = size * BASE_SCALE;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else if (Platform.OS === 'web') {
    return `${size}px`;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function isIphoneX() {
  const dim = Dimensions.get('window');

  return Platform.OS === 'ios' && (isIPhoneXSize(dim) || isIPhoneXrSize(dim));
}

export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}

export function AppBarHeight() {
  if (Platform.OS === 'ios') {
    return normalize(64);
  } else {
    return normalize(56);
  }
}

export function StatusBarHeight() {
  if (Platform.OS === 'ios') {
    return normalize(24);
  } else {
    return 0;
  }
}
