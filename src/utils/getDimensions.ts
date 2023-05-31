import { Dimensions } from 'react-native';

export type GetDimensionsType = {
  actualWidth: number;
  actualHeight: number;
  width: number;
  height: number;
};

const getDimensions = (): GetDimensionsType => {
  const actualWidth = Dimensions.get('window').width;
  const actualHeight = Dimensions.get('window').height;

  return {
    width: Math.min(actualWidth, actualHeight),
    height: Math.max(actualWidth, actualHeight),
    actualWidth,
    actualHeight,
  };
};

export default getDimensions;
