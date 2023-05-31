import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getDimensions, styleJoiner } from '../../utils';
import PaintingPalette from './Painting.header.palette';
import PaintingBrushes from './Painting.header.brushes';
import { grids, palette, shadow } from '../../helpers/theme';
import useDrawCnx from './useDrawCnx';
import { useColorStore } from './store';
import { useDisclosure } from './hooks';
import IconButton from '../Button/IconButton';

const { width } = getDimensions();
const imageSize = width * 0.2757;

const { setColor } = useColorStore.getState();

const PaintingHeader = (): JSX.Element => {
  const { history } = useDrawCnx();
  const {
    eraseMode,
    setEraseModeDisclosure,
    paletteOpen,
    setPaletteDisclosure,
    brushesOpen,
    setBrushesDisclosure,
  } = useDisclosure();

  const handleCloseOthers = () => {
    if (paletteOpen) {
      setPaletteDisclosure(false);
    }
    if (brushesOpen) {
      setBrushesDisclosure(false);
    }
  };

  const handleEraseMode = () => {
    if (eraseMode) {
      setEraseModeDisclosure(false);
    } else {
      setEraseModeDisclosure(true);
      handleCloseOthers();
      setColor(palette.white);
    }
  };
  const undo = () => {
    history.undo();
    handleCloseOthers();
  };

  const redo = () => {
    history.redo();
    handleCloseOthers();
  };

  return (
    <View style={styles.drawWrapper}>
      <View style={styles.rowButtons}>
        <PaintingPalette />
        <IconButton
          name="arrow-u-left-top"
          size={36}
          color="black"
          onPress={undo}
        />
      </View>
      <IconButton
        onPress={handleEraseMode}
        name="eraser"
        color="black"
        size={32}
        style={styleJoiner(eraseMode && styles.activeEraser)}
      />
      <View style={styles.rowButtons}>
        <IconButton
          name="arrow-u-right-top"
          size={36}
          color="black"
          onPress={redo}
        />
        <PaintingBrushes />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width,
    paddingHorizontal: grids.gutter - 10,
    marginBottom: grids.unit * 2,
    zIndex: 2,
  },
  rowButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: imageSize - 4,
  },
  activeEraser: {
    borderWidth: 1,
    borderColor: palette.gray,
    ...shadow,
  },
});

export default PaintingHeader;
