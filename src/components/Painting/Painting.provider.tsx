import React, { createContext } from "react";
import { nameMaker, requestCameraRoll } from '../../utils';
import { ImageFormat, useCanvasRef } from '@shopify/react-native-skia';
import FileSystem from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useLinesStore } from './store';
import type { FC, ReactNode, RefObject } from 'react';
import type { SkiaDomView, DataSource } from '@shopify/react-native-skia';
import type { CurrentPath, HistoryType } from './types';

export type PaintingProviderType = {
  bareImage?: DataSource;
  strokes: Array<number>;
  drawRef: RefObject<SkiaDomView>;
  history: {
    memory: HistoryType;
    undo: Function;
    redo: Function;
    clear: Function;
    push: Function;
    save: Function;
  };
};

const strokes = [2, 4, 6, 8, 10];

// @ts-ignore
export const PaintingCntx = createContext<PaintingProviderType>();

const album = 'album-drawing';
const albumPictureDirectoryPath = `${FileSystem.DocumentDirectoryPath}/${album}`;

export interface PaintingProvider {
  bareImage?: DataSource | string;
  children?: ReactNode;
}

const history: HistoryType = {
  undo: [],
  redo: [],
};

const { setLines } = useLinesStore.getState();

const PaintingProvider: FC<PaintingProvider> = ({ children, bareImage }) => {
  const drawRef = useCanvasRef();

  const undo = () => {
    if (history.undo.length === 0) {
      return;
    }
    let lastPath = history.undo.slice(-1)[0];
    history.redo.push(lastPath);
    history.undo.splice(history.undo.length - 1, 1);
    setLines([...history.undo]);
  };
  const redo = () => {
    if (history.redo.length === 0) {
      return;
    }
    let lastPath = history.redo.slice(-1)[0];
    history.redo.splice(history.redo.length - 1, 1);
    history.undo.push(lastPath);
    setLines([...history.undo]);
  };
  const clear = () => {
    history.undo = [];
    history.redo = [];
  };
  const push = (path: CurrentPath) => {
    history.undo.push(path);
  };
  const save = async () => {
    try {
      await requestCameraRoll();
      const img = drawRef.current?.makeImageSnapshot();
      const jpg = img?.encodeToBase64(ImageFormat.JPEG, 100) || '';

      await FileSystem.mkdir(albumPictureDirectoryPath);

      const imageAddress = `${albumPictureDirectoryPath}/${nameMaker()}.jpg`;
      await FileSystem.writeFile(imageAddress, jpg, 'base64');
      await CameraRoll.save(imageAddress, {
        type: 'photo',
        album,
      });
      await FileSystem.unlink(imageAddress);
      console.log('success');
    } catch (error: any) {
      console.error('save drawing', error);
    }
  };

  return (
    <PaintingCntx.Provider
      value={{
        bareImage,
        strokes,
        drawRef,
        history: {
          memory: history,
          undo,
          redo,
          clear,
          push,
          save,
        },
      }}
    >
      {children}
    </PaintingCntx.Provider>
  );
};

export default PaintingProvider;
