import React, { memo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { styleJoiner } from '../utils';
import PaintingProvider from './Painting/Painting.provider';
import DrawAlongHeader from './DrawAlong.header';
import Painting from './Painting/Painting';
import { palette, sizes } from '../helpers/theme';
import RoundView from './RoundView/RoundView';
import samplePaintingBg from '../assets/paintSample.png';

const imageSize = 100;

const Drawing = (): JSX.Element => {
  return (
    <PaintingProvider bareImage={samplePaintingBg}>
      <View style={styles.wrapper}>
        <DrawAlongHeader />
        <RoundView style={styles.roundViewWrapper}>
          <Image
            source={samplePaintingBg}
            style={styleJoiner(
              { width: imageSize, height: imageSize },
              styles.image,
            )}
          />
          <Painting />
        </RoundView>
      </View>
    </PaintingProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  roundViewWrapper: {
    marginTop: 28,
    marginBottom: -200,
    alignItems: 'center',
    backgroundColor: palette.white,
  },
  image: {
    marginTop: -imageSize / 2,
    marginBottom: imageSize / 4,
    borderRadius: sizes.radius,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.black,
  },
});

export default memo(Drawing);
