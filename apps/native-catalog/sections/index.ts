import type { ComponentType } from 'react';
import { FoundationsSection } from './FoundationsSection';
import { TextSection } from './TextSection';

export const sections: { key: string; Component: ComponentType }[] = [
  { key: 'foundations', Component: FoundationsSection },
  { key: 'text', Component: TextSection },
];
