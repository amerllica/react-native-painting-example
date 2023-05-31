import { create } from 'zustand';
import type { CurrentPath } from './types';
import { palette } from '../../helpers/theme';

type LinesStore = {
  lines: CurrentPath[];
  setLines: (completedPaths: CurrentPath[]) => void;
};
const useLinesStore = create<LinesStore>((set) => ({
  lines: [],
  setLines: (lines) => {
    set({ lines });
  },
}));

type StrokeStore = {
  strokeWidth: number;
  setStrokeWidth: (strokeWidth: number) => void;
};
const useStrokeStore = create<StrokeStore>((set) => ({
  strokeWidth: 1,
  setStrokeWidth: (strokeWidth) => {
    set({ strokeWidth });
  },
}));

let prevColor = '';
type ColorStore = {
  color: string;
  setColor: (color: string) => void;
};
const useColorStore = create<ColorStore>((set) => ({
  color: palette.black,
  setColor: (color) => {
    set((state) => {
      prevColor = state.color;

      return { color };
    });
  },
}));

type DisclosureStore = {
  eraseMode: boolean;
  setEraseModeDisclosure: (mode: boolean) => void;
  paletteOpen: boolean;
  setPaletteDisclosure: (mode: boolean) => void;
  brushesOpen: boolean;
  setBrushesDisclosure: (mode: boolean) => void;
};
const useDisclosureStore = create<DisclosureStore>((set) => ({
  eraseMode: false,
  setEraseModeDisclosure: (mode) => {
    set((state) => {
      if (state.eraseMode && prevColor) {
        const { setColor } = useColorStore.getState();
        setColor(prevColor);
      }

      return { eraseMode: mode };
    });
  },
  paletteOpen: false,
  setPaletteDisclosure: (mode) => {
    set({ paletteOpen: mode });
  },
  brushesOpen: false,
  setBrushesDisclosure: (mode) => {
    set({ brushesOpen: mode });
  },
}));

export { useLinesStore, useStrokeStore, useColorStore, useDisclosureStore };
