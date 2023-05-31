import type {
  DataSource,
  SkPath,
  SkPaint,
  SkiaMutableValue,
} from '@shopify/react-native-skia';
import type { palette } from '../../helpers/theme';

type PaletteType = keyof typeof palette;

type CurrentPath = {
  path: SkPath;
  paint: SkPaint;
};

type HistoryType = {
  undo: CurrentPath[];
  redo: CurrentPath[];
};

type ColorItemType = {
  bg: string;
  br: string;
  ky: PaletteType;
};

export type {
  SkPath,
  SkiaMutableValue,
  DataSource,
  CurrentPath,
  HistoryType,
  ColorItemType,
};
