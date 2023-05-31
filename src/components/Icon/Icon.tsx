import React from 'react';
import type { FC } from 'react';
import type { ViewStyle, StyleProp } from 'react-native';
import {
  IconComponentProvider,
  Icon as MIcon,
} from '@react-native-material/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type MaterialCommunityIconsJson from 'react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';

export interface IconProps {
  style?: StyleProp<ViewStyle>;
  name: keyof typeof MaterialCommunityIconsJson;
  size?: number;
  color?: string;
}

const Icon: FC<IconProps> = ({ style, name, size = 24, color = '#ff0000' }) => (
  // @ts-ignore
  <IconComponentProvider IconComponent={MaterialCommunityIcons as any}>
    <MIcon name={name} size={size} color={color} style={style} />
  </IconComponentProvider>
);

export default Icon;
