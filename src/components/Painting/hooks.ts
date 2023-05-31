import { useCallback } from 'react';
import {
  useColorStore,
  useDisclosureStore,
  useLinesStore,
  useStrokeStore,
} from './store';

const useDisclosure = () =>
  useDisclosureStore(
    useCallback(
      (state) => ({
        eraseMode: state.eraseMode,
        setEraseModeDisclosure: state.setEraseModeDisclosure,
        paletteOpen: state.paletteOpen,
        setPaletteDisclosure: state.setPaletteDisclosure,
        brushesOpen: state.brushesOpen,
        setBrushesDisclosure: state.setBrushesDisclosure,
      }),
      []
    )
  );

const useColor = () =>
  useColorStore(
    useCallback(
      (state) => ({
        color: state.color,
        setColor: state.setColor,
      }),
      []
    )
  );

const useStroke = () =>
  useStrokeStore(
    useCallback(
      (state) => ({
        strokeWidth: state.strokeWidth,
        setStrokeWidth: state.setStrokeWidth,
      }),
      []
    )
  );

const useLines = () =>
  useLinesStore(
    useCallback(
      (state) => ({
        lines: state.lines,
        setLines: state.setLines,
      }),
      []
    )
  );

export { useDisclosure, useColor, useStroke, useLines };
