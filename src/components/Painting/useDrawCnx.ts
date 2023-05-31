import { useContext } from 'react';
import { PaintingCntx } from './Painting.provider';

const useDrawCnx = () => useContext(PaintingCntx);

export default useDrawCnx;
