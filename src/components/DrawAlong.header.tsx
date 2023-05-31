import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { Icon, IconButton, BaseButton } from '../components';
import { grids, palette } from '../helpers/theme';
import useDrawCnx from './Painting/useDrawCnx';
import { useColorStore, useLinesStore, useStrokeStore } from './Painting/store';

const { setLines } = useLinesStore.getState();
const { setColor } = useColorStore.getState();
const { setStrokeWidth } = useStrokeStore.getState();

const DrawAlongHeader = (): JSX.Element => {
  const { history, drawRef } = useDrawCnx();

  const handleRestore = () => {
    drawRef.current?.redraw();
    setLines([]);
    setStrokeWidth(1);
    setColor(palette.black);
    history.clear();

    return null;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleRestore,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <View style={styles.header}>
      <IconButton
        name="restore-alert"
        size={28}
        color="black"
        onPress={handleRestore}
      />
      <IconButton
        name="download"
        color="black"
        size={28}
        onPress={history.save as any}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: grids.gutter,
  },
});

export default DrawAlongHeader;
