import React from 'react';
import { IconButton as MIconButton } from '@react-native-material/core';
import Icon, { IconProps } from '../Icon/Icon';
import type { FC } from 'react';
import type { StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';

export interface IconButtonProps extends IconProps {
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const IconButton: FC<IconButtonProps> = ({
  style,
  iconStyle,
  name,
  size,
  color,
  onPress,
}) => (
  <MIconButton
    onPress={onPress}
    contentContainerStyle={style}
    icon={() => (
      <Icon name={name} size={size} color={color} style={iconStyle} />
    )}
  />
);

export default IconButton;
