import { Platform } from 'react-native';

const palette = {
  white: '#ffffff',
  darkWhite: '#fafafa',
  black: '#000000',
  gray: '#6a6a6a',
  transparent: '#ffffff01',
} as const;

const grids = {
  unit: 10,
  gutter: 40,
  padding: 12,
} as const;

const sizes = {
  radius: 12,
  icon: 20,
} as const;

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: palette.black,
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
    android: {
      elevation: 10,
    },
  }),
};

const unShadow = {
  ...Platform.select({
    ios: {
      shadowColor: palette.transparent,
    },
    android: {
      elevation: 0,
    },
  }),
};

const RADIUS_NUMBER = 70;

export { palette, grids, sizes, shadow, unShadow, RADIUS_NUMBER };
