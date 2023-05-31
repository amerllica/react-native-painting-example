import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styleJoiner, isIphoneX } from '../../utils';
import { palette, RADIUS_NUMBER, shadow } from '../../helpers/theme';
import type { ReactNode, FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface RoundViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const RoundView: FC<RoundViewProps> = ({ style, children }) => (
  <View style={styleJoiner(styles.roundViewRoot, style)}>{children}</View>
);

const styles = StyleSheet.create({
  roundViewRoot: {
    flex: 1,
    marginTop: 34,
    paddingBottom: isIphoneX() ? 166 : 200,
    backgroundColor: palette.darkWhite,
    borderTopLeftRadius: RADIUS_NUMBER,
    borderTopRightRadius: RADIUS_NUMBER,
    ...shadow,
  },
});

export default RoundView;
