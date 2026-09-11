import type { ComponentType } from 'react';
import { FoundationsSection } from './FoundationsSection';

export const sections: { key: string; Component: ComponentType }[] = [
  { key: 'foundations', Component: FoundationsSection },
];
