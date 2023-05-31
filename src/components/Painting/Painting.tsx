import React from 'react';
import PaintingBody from './Painting.body';
import PaintingHeader from './Painting.header';
import type { FC } from 'react';
import type { DataSource } from './types';

interface PaintingType {
  baseImage?: DataSource;
}

const Painting: FC<PaintingType> = () => (
  <>
    <PaintingHeader />
    <PaintingBody />
  </>
);

export default Painting;
