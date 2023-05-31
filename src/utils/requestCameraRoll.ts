import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { isIos } from './deviceDetector';

const requestCameraRoll = async () => {
  const PermissionsListToAsk = isIos()
    ? [
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
        PERMISSIONS.IOS.MEDIA_LIBRARY,
      ]
    : [
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ];

  try {
    await requestMultiple(PermissionsListToAsk);
  } catch (e) {
    console.error('error');
  }
};

export default requestCameraRoll;
