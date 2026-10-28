import React from 'react';

import Horizontal from '../../assets/logos/Horizontal.svg';
import HorizontalBlack from '../../assets/logos/Horizontal_black.svg';
import HorizontalFilled from '../../assets/logos/Horizontal_filled.svg';
import HorizontalWhite from '../../assets/logos/Horizontal_white.svg';
import Vertical from '../../assets/logos/Vertical.svg';
import VerticalBlack from '../../assets/logos/Vertical_black.svg';
import VerticalFilled from '../../assets/logos/Vertical_filled.svg';
import VerticalWhite from '../../assets/logos/Vertical_white.svg';
import Word from '../../assets/logos/Word.svg';
import WordBlack from '../../assets/logos/Word_black.svg';
import WordFilled from '../../assets/logos/Word_filled.svg';
import WordWhite from '../../assets/logos/Word_white.svg';
import Symbol from '../../assets/logos/symbol.svg';
import SymbolBlack from '../../assets/logos/symbol_black.svg';
import SymbolFilled from '../../assets/logos/symbol_filled.svg';
import SymbolWhite from '../../assets/logos/symbol_white.svg';

/** Approved lockup configurations. Each maps to a framed master export that already
 * carries the brand margin — don't add your own padding around these. */
export type KaayoLogoVariant = 'horizontal' | 'vertical' | 'symbol' | 'wordmark';

/** `brand` red on light, `white` for dark/brand fields, `black` for mono,
 * `filled` for a solid brand tile with the mark knocked out in white. */
export type KaayoLogoTone = 'brand' | 'white' | 'black' | 'filled';

const SOURCES: Record<KaayoLogoVariant, Record<KaayoLogoTone, React.FC<{ width: number; height: number }>>> = {
  horizontal: { brand: Horizontal, white: HorizontalWhite, black: HorizontalBlack, filled: HorizontalFilled },
  vertical: { brand: Vertical, white: VerticalWhite, black: VerticalBlack, filled: VerticalFilled },
  symbol: { brand: Symbol, white: SymbolWhite, black: SymbolBlack, filled: SymbolFilled },
  wordmark: { brand: Word, white: WordWhite, black: WordBlack, filled: WordFilled },
};

/** Frame aspect (width ÷ height) of each master export. */
const ASPECT: Record<KaayoLogoVariant, number> = {
  horizontal: 224 / 72,
  vertical: 1,
  symbol: 1,
  wordmark: 112 / 32,
};

interface Props {
  variant?: KaayoLogoVariant;
  tone?: KaayoLogoTone;
  /** Frame width. Height is derived from the variant's aspect unless given explicitly. */
  width?: number;
  height?: number;
}

/**
 * Kaayo logo, rendered from the approved framed masters in `assets/Logos/SVGs`.
 * Pass one dimension and the other follows the master's aspect, so the lockup can
 * never be stretched. Never recreate or retype the artwork.
 */
export function KaayoLogo({ variant = 'horizontal', tone = 'brand', width, height }: Props) {
  const aspect = ASPECT[variant];
  const w = width ?? (height !== undefined ? height * aspect : 140);
  const h = height ?? w / aspect;
  const Source = SOURCES[variant][tone];

  return <Source width={w} height={h} />;
}
