import {
  isTablet,
  isAndroid,
  isIos,
  ifIphoneX,
  isIphoneX,
  isIosButNotX,
  getBottomSpace,
  getStatusBarHeight,
} from './deviceDetector';
import styleJoiner from './styleJoiner';
import orientation from './orientation';
import getDimensions from './getDimensions';
import nameMaker from './nameMaker';
import requestCameraRoll from './requestCameraRoll';
import clamValue from './clamValue';
import { hsvToHex } from './blender';

export type { HsvType } from './blender';

export {
  isTablet,
  isAndroid,
  isIos,
  ifIphoneX,
  isIphoneX,
  isIosButNotX,
  getBottomSpace,
  getStatusBarHeight,
  styleJoiner,
  orientation,
  getDimensions,
  nameMaker,
  requestCameraRoll,
  clamValue,
  hsvToHex,
};
