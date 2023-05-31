import React from 'react';
import { Path } from '@shopify/react-native-skia';
import { useColor, useStroke } from './hooks';
import type { FC } from 'react';
import type { SkPath, SkiaMutableValue } from './types';

export interface PaintingBodyPenProps {
  path: SkiaMutableValue<SkPath>;
}

const PaintingBodyPen: FC<PaintingBodyPenProps> = ({ path }) => {
  const { color } = useColor();
  const { strokeWidth } = useStroke();

  return (
    <Path
      path={path}
      strokeWidth={strokeWidth}
      color={color}
      style="stroke"
      strokeJoin="round"
      strokeCap="round"
    />
  );
};

export default PaintingBodyPen;
