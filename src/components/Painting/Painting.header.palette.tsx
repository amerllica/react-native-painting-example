import React from 'react';
import { StyleSheet } from 'react-native';
// @ts-ignore
import { ColorWheel } from 'react-native-color-wheel';
// @ts-ignore
import { SliderValuePicker } from 'react-native-slider-color-picker';
import tinyColor from 'tinycolor2';
import { View } from 'react-native';
import BaseButton from '../Button/BaseButton';
import { hsvToHex, styleJoiner } from '../../utils';
import { palette, shadow } from '../../helpers/theme';
import saturationMask from '../../assets/saturationBlackMask.png';
import { useColor, useDisclosure } from './hooks';
import type { HsvType } from '../../utils';

const PaintingHeaderPalette = (): JSX.Element => {
  const { paletteOpen, setPaletteDisclosure, setEraseModeDisclosure } =
    useDisclosure();
  const { color, setColor } = useColor();

  const handleChangeColor = (clr: string) => {
    setColor(clr);
  };
  const handlePickFromWheel = (hsv: HsvType) => {
    const clr = hsvToHex(hsv);

    handleChangeColor(clr);
  };
  const handlePickSaturation = (colorHsvOrRgb: any) => {
    handleChangeColor(tinyColor(colorHsvOrRgb).toHexString());
  };

  return (
    <View style={styles.paletteRoot}>
      <BaseButton
        onPress={() => {
          setEraseModeDisclosure(false);
          setPaletteDisclosure(!paletteOpen);
        }}
        style={styleJoiner(styles.button, {
          backgroundColor: color,
          borderColor: color,
        })}
      />
      {paletteOpen && (
        <View style={styles.paletteWrapper}>
          <View style={styles.triangle} />
          <View style={styles.wheelWrapper}>
            <ColorWheel
              initialColor={color}
              onColorChangeComplete={(hsv: HsvType) => handlePickFromWheel(hsv)}
              onColorChange={(hsv: HsvType) => handlePickFromWheel(hsv)}
              style={styles.wheel}
              radius={70}
              thumbSize={32}
            />
          </View>
          <View style={styles.saturationWrapper}>
            <SliderValuePicker
              useNativeDriver
              oldColor={color}
              minimumValue={0.02}
              step={0.05}
              style={styleJoiner(styles.saturation, {
                backgroundColor: color,
              })}
              trackStyle={styles.saturationTrack}
              thumbStyle={styleJoiner(styles.saturationThumb, {
                backgroundColor: color,
              })}
              trackImage={saturationMask}
              onColorChange={handlePickSaturation}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paletteRoot: {
    width: 46,
    height: 46,
    position: 'relative',
    borderRadius: 89,
  },
  paletteWrapper: {
    borderRadius: 12,
    backgroundColor: palette.white,
    position: 'absolute',
    top: 62,
    left: 0,
    ...shadow,
  },
  triangle: {
    backgroundColor: palette.transparent,
    position: 'absolute',
    top: -10,
    left: 8,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 15,
    borderBottomWidth: 20,
    borderLeftWidth: 15,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: palette.white,
    borderLeftColor: 'transparent',
    ...shadow,
  },
  wheelWrapper: {
    alignItems: 'center',
    height: 220,
    borderRadius: 12,
    backgroundColor: palette.white,
    paddingHorizontal: 12,
    paddingTop: 30,
    paddingBottom: 12,
    zIndex: 1,
  },
  wheel: {
    width: 190,
  },
  button: {
    width: 46,
    height: 46,
    borderRadius: 99,
    borderWidth: 4,
    marginTop: 4,
    backgroundColor: palette.black,
    borderColor: palette.black,
    ...shadow,
  },
  blackButton: {
    width: 46,
    height: 46,
    borderRadius: 99,
    borderWidth: 4,
    marginTop: 20,
    backgroundColor: palette.black,
    borderColor: palette.black,
    ...shadow,
  },
  saturationWrapper: {
    alignItems: 'center',
    height: 30,
    marginBottom: 12,
  },
  saturation: {
    height: 12,
    borderRadius: 6,
  },
  saturationTrack: {
    height: 12,
    width: 150,
  },
  saturationThumb: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    ...shadow,
  },
});

export default PaintingHeaderPalette;
