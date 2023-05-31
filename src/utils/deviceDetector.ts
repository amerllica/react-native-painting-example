import { Platform } from 'react-native';
import {
  ifIphoneX,
  isIphoneX,
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { isTablet } from 'react-native-device-info';

const isAndroid = (): boolean => Platform.OS === 'android';
const isIos = (): boolean => Platform.OS === 'ios';
const isIosButNotX = (): boolean => isIos() && !isIphoneX();

export {
  isTablet,
  isAndroid,
  isIos,
  ifIphoneX,
  isIphoneX,
  isIosButNotX,
  getBottomSpace,
  getStatusBarHeight,
};
