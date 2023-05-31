import React from 'react';
import { Pressable } from 'react-native';
import type { FC } from 'react';
import type { PressableProps } from 'react-native';

export interface BaseButtonProps extends PressableProps {}

const Button: FC<BaseButtonProps> = ({ children, ...rest }) => (
  <Pressable {...rest}>{children}</Pressable>
);

export default Button;
