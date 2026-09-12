import type { ComponentType } from 'react';
import { BadgeSection } from './BadgeSection';
import { ButtonSection } from './ButtonSection';
import { DisplaySection } from './DisplaySection';
import { FoundationsSection } from './FoundationsSection';
import { IconSection } from './IconSection';
import { LabelSection } from './LabelSection';
import { TextSection } from './TextSection';

export const sections: { key: string; Component: ComponentType }[] = [
  { key: 'foundations', Component: FoundationsSection },
  { key: 'text', Component: TextSection },
  { key: 'icon', Component: IconSection },
  { key: 'button', Component: ButtonSection },
  { key: 'label', Component: LabelSection },
  { key: 'badge', Component: BadgeSection },
  { key: 'display', Component: DisplaySection },
];
