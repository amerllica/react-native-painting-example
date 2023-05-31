import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Group,
  Canvas,
  Path,
  Fill,
  Image,
  Skia,
  useImage,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import { clamValue, getDimensions, isIos } from '../../utils';
import useDrawCnx from './useDrawCnx';
import { palette, shadow } from '../../helpers/theme';
import PaintingBodyPen from './Painting.body.pen';
import { useLines } from './hooks';
import { useColorStore, useDisclosureStore, useStrokeStore } from './store';

const { width, height } = getDimensions();
const A4_WIDTH_300DPI = 210;
const A4_HEIGHT_300DPI = 297;
const A4_HEIGHT_RATIO = A4_HEIGHT_300DPI / A4_WIDTH_300DPI;
// const A4_WIDTH_RATIO = A4_WIDTH_300DPI / A4_HEIGHT_300DPI;
const SAFE_HEIGHT_RATIO = 0.58;
const SAFE_HEIGHT = height * SAFE_HEIGHT_RATIO;

const bestDrawWidth = clamValue(width - 24, 0, 600);
const drawHeight = clamValue(bestDrawWidth * A4_HEIGHT_RATIO, 0, SAFE_HEIGHT);
const drawWidth = bestDrawWidth;
/* bestDrawWidth * A4_HEIGHT_RATIO > SAFE_HEIGHT
    ? bestDrawWidth * A4_WIDTH_RATIO
    : bestDrawWidth; */
const handleDisclosure = () => {
  const {
    paletteOpen,
    setPaletteDisclosure,
    brushesOpen,
    setBrushesDisclosure,
  } = useDisclosureStore.getState();
  const shouldPaint = isIos() || !(brushesOpen || paletteOpen);

  return {
    shouldPaint,
    paletteOpen,
    setPaletteDisclosure,
    brushesOpen,
    setBrushesDisclosure,
  };
};

const PaintingBody = (): JSX.Element => {
  const { bareImage, history, drawRef } = useDrawCnx();
  const { lines, setLines } = useLines();

  const path = useValue(Skia.Path.Make());
  const paint = useValue(Skia.Paint());
  const image = useImage(bareImage || '');

  const touchHandler = useTouchHandler(
    {
      onStart: ({ x, y }) => {
        const {
          shouldPaint,
          paletteOpen,
          setPaletteDisclosure,
          brushesOpen,
          setBrushesDisclosure,
        } = handleDisclosure();

        if (shouldPaint) {
          if (brushesOpen) {
            setBrushesDisclosure(false);
          }
          if (paletteOpen) {
            setPaletteDisclosure(false);
          }
          path.current.moveTo(x, y);
          const { color } = useColorStore.getState();
          const { strokeWidth } = useStrokeStore.getState();
          paint.current.setStrokeWidth(strokeWidth);
          paint.current.setColor(Skia.Color(color));
        }
      },
      onActive: ({ x, y }) => {
        const { shouldPaint } = handleDisclosure();

        if (shouldPaint) {
          const lastPt = path.current.getLastPt();
          const xMid = (lastPt.x + x) / 2;
          const yMid = (lastPt.y + y) / 2;
          path.current.quadTo(lastPt.x, lastPt.y, xMid, yMid);
        }
      },
      onEnd: () => {
        const { shouldPaint } = handleDisclosure();

        if (shouldPaint) {
          const currentPath = {
            path: path.current.copy(),
            paint: paint.current.copy(),
          };
          setLines([...lines, currentPath]);
          history.push(currentPath);
          path.current.reset();
          paint.current.reset();
        }
      },
    },
    [lines],
  );

  return (
    <View style={styles.drawAlongRoot}>
      <Canvas ref={drawRef} style={styles.paintBoom} onTouch={touchHandler}>
        <Group>
          <Fill color={palette.white} />
          {lines?.map((line, index) => (
            <Path
              key={`line_${line.path.toSVGString()}_${index}`}
              style="stroke"
              strokeJoin="round"
              strokeCap="round"
              path={line.path}
              paint={line.paint}
              strokeWidth={line.paint.getStrokeWidth()}
              color={line.paint.getColor()}
            />
          ))}
          <PaintingBodyPen path={path} />
          {!!image && (
            <Image
              x={0}
              y={0}
              image={image}
              width={drawWidth}
              height={drawHeight}
              fit="contain"
            />
          )}
        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  drawAlongRoot: {
    position: 'relative',
    width: drawWidth,
    height: drawHeight,
    zIndex: 1,
  },
  paintBoom: {
    position: 'absolute',
    width: drawWidth,
    height: drawHeight,
  },
  skiaBoom: {
    width: drawWidth,
    height: drawHeight,
  },
});

export default PaintingBody;
