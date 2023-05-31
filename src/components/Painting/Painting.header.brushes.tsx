import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styleJoiner } from '../../utils';
import { palette, shadow } from '../../helpers/theme';
import useDrawCnx from './useDrawCnx';
import { useColor, useDisclosure } from './hooks';
import { useStrokeStore } from './store';
import IconButton from '../Button/IconButton';
import BaseButton from '../Button/BaseButton';

const { setStrokeWidth } = useStrokeStore.getState();

const PaintingHeaderBrushes = (): JSX.Element => {
  const { color } = useColor();
  const { brushesOpen, setBrushesDisclosure } = useDisclosure();
  const { strokes } = useDrawCnx();
  const clr = color === palette.white ? palette.gray : color;

  const handleChangeStroke = (stroke: number) => () => {
    setStrokeWidth(stroke);
    setBrushesDisclosure(false);
  };

  return (
    <View style={styles.drawingBrushesRoot}>
      <IconButton
        style={styles.disclosureButton}
        onPress={() => setBrushesDisclosure(!brushesOpen)}
        name="format-line-weight"
        size={36}
        color={clr}
      />
      {brushesOpen && (
        <View style={styles.brushesWrapper}>
          {strokes.map((stroke, i) => (
            <BaseButton
              key={`brushes_${stroke}_${i}`}
              onPress={handleChangeStroke(stroke)}
              style={styles.button}
            >
              <View
                style={styleJoiner(styles.brush, {
                  backgroundColor: clr,
                  height: stroke,
                })}
              />
            </BaseButton>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawingBrushesRoot: {
    width: 46,
    height: 46,
    position: 'relative',
    borderRadius: 99,
  },
  disclosureButton: {
    ...shadow,
  },
  brushesWrapper: {
    position: 'absolute',
    top: '100%',
    left: 0,
    borderBottomRightRadius: 99,
    borderBottomLeftRadius: 99,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: 99,
    marginTop: 4,
    backgroundColor: palette.white,
    ...shadow,
  },
  brush: {
    width: 25,
    borderRadius: 10,
  },
});

export default PaintingHeaderBrushes;
