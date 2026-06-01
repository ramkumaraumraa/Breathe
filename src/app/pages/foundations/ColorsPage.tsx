import { useState } from 'react';
import { Check, Copy, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { PageHeader } from '../../components/shared/PageHeader';
import { PageNavigation } from '../../components/shared/PageNavigation';

interface ColorStop {
  stop: number;
  hex: string;
  textColor: string;
}

interface ColorScale {
  name: string;
  description: string;
  root: string;
  stops: ColorStop[];
  tokenPath: string;   // e.g. 'color.core.primary' → generates 'color.core.primary.500'
  cssPrefix: string;   // e.g. '--color-core-primary' → generates 'var(--color-core-primary500)'
  keyStops?: number[]; // stops to highlight with ★
}

const STOP_USAGE: Record<number, string> = {
  25:  'Lightest tint — subtle hover overlays, faint backgrounds',
  50:  'Ultra-light fill — selected row & chip backgrounds',
  75:  'Subtle fill — hover states, skeleton loaders',
  100: 'Backgrounds, tinted surfaces, disabled fills',
  200: 'Subtle fills, hover tints, skeleton states',
  300: 'Light accents, placeholder graphic fills',
  400: 'Secondary interactive, mid-tone accents',
  500: '★ Root — default interactive, primary brand usage',
  600: 'Hover/active state on default interactive element',
  700: 'Active states, pressed buttons, border fills',
  800: 'Text on light bg, dark borders, high emphasis',
  900: 'Dark text values, near-black UI fills',
  925: 'Near-black fills, deep surface layers',
  950: 'Dark backgrounds, inverse surface fills',
  975: 'Deepest tint — pure darkness anchor',
};

interface GradientInfo {
  name: string;
  token: string;
  stops: string;
  usage: string;
  gradient: string;
}

interface BrandPalette {
  id: string;
  name: string;
  tagline: string;
  accentColor: string;
  core: ColorScale[];
  gradients: GradientInfo[];
}

// Feedback scales (shared across all brands)
const feedbackScales: ColorScale[] = [
  {
    name: 'Positive',
    description: 'Success states, confirmations, completed actions. Fixed across all brands — cannot be remapped.',
    root: '#16A34A',
    stops: [
      { stop: 25, hex: '#E8F8EE', textColor: '#0F172A' },
      { stop: 50, hex: '#D0EDDB', textColor: '#0F172A' },
      { stop: 75, hex: '#BBDFC8', textColor: '#0F172A' },
      { stop: 100, hex: '#ABDEBE', textColor: '#0F172A' },
      { stop: 200, hex: '#86CFA1', textColor: '#0F172A' },
      { stop: 300, hex: '#61C084', textColor: '#0F172A' },
      { stop: 400, hex: '#3BB267', textColor: '#0F172A' },
      { stop: 500, hex: '#16A34A', textColor: '#fff' },
      { stop: 600, hex: '#168D43', textColor: '#fff' },
      { stop: 700, hex: '#17773C', textColor: '#fff' },
      { stop: 800, hex: '#176235', textColor: '#fff' },
      { stop: 900, hex: '#184C2E', textColor: '#fff' },
      { stop: 925, hex: '#183628', textColor: '#fff' },
      { stop: 950, hex: '#0F2218', textColor: '#fff' },
      { stop: 975, hex: '#060E09', textColor: '#fff' },
    ],
    tokenPath: 'color.feedback.positive',
    cssPrefix: '--color-feedback-positive',
    keyStops: [500, 50, 700],
  },
  {
    name: 'Warning',
    description: 'Caution states, pending actions, reversible decisions. Fixed across all brands — cannot be remapped.',
    root: '#F59E0B',
    stops: [
      { stop: 25, hex: '#FFFBF0', textColor: '#0F172A' },
      { stop: 50, hex: '#FDECCE', textColor: '#0F172A' },
      { stop: 75, hex: '#FCE2B5', textColor: '#0F172A' },
      { stop: 100, hex: '#FBDCA7', textColor: '#0F172A' },
      { stop: 200, hex: '#FACD80', textColor: '#0F172A' },
      { stop: 300, hex: '#F8BD59', textColor: '#0F172A' },
      { stop: 400, hex: '#F7AE32', textColor: '#0F172A' },
      { stop: 500, hex: '#F59E0B', textColor: '#0F172A' },
      { stop: 600, hex: '#D2890E', textColor: '#fff' },
      { stop: 700, hex: '#AF7411', textColor: '#fff' },
      { stop: 800, hex: '#8B5F15', textColor: '#fff' },
      { stop: 900, hex: '#684A18', textColor: '#fff' },
      { stop: 925, hex: '#45351B', textColor: '#fff' },
      { stop: 950, hex: '#2C2110', textColor: '#fff' },
      { stop: 975, hex: '#130D04', textColor: '#fff' },
    ],
    tokenPath: 'color.feedback.warning',
    cssPrefix: '--color-feedback-warning',
    keyStops: [500, 50, 700],
  },
  {
    name: 'Negative',
    description: 'Error states, destructive actions, critical alerts. Fixed across all brands — cannot be remapped.',
    root: '#DC2626',
    stops: [
      { stop: 25, hex: '#FEECEC', textColor: '#0F172A' },
      { stop: 50, hex: '#F8D4D4', textColor: '#0F172A' },
      { stop: 75, hex: '#F5C0C0', textColor: '#0F172A' },
      { stop: 100, hex: '#F2B1B1', textColor: '#0F172A' },
      { stop: 200, hex: '#ED8E8E', textColor: '#0F172A' },
      { stop: 300, hex: '#E76B6B', textColor: '#0F172A' },
      { stop: 400, hex: '#E24949', textColor: '#0F172A' },
      { stop: 500, hex: '#DC2626', textColor: '#fff' },
      { stop: 600, hex: '#BD2425', textColor: '#fff' },
      { stop: 700, hex: '#9E2224', textColor: '#fff' },
      { stop: 800, hex: '#7E2123', textColor: '#fff' },
      { stop: 900, hex: '#5F1F22', textColor: '#fff' },
      { stop: 925, hex: '#401D20', textColor: '#fff' },
      { stop: 950, hex: '#280F11', textColor: '#fff' },
      { stop: 975, hex: '#100406', textColor: '#fff' },
    ],
    tokenPath: 'color.feedback.negative',
    cssPrefix: '--color-feedback-negative',
    keyStops: [500, 50, 700],
  },
];

// Neutral scales (shared across all brands)
const neutralScales: ColorScale[] = [
  {
    name: 'White',
    description: 'Page backgrounds, card surfaces, input fills, skeleton loaders, disabled states. 500 = pure white anchor.',
    root: '#D6D6D7',
    stops: [
      { stop: 25, hex: '#FFFFFF', textColor: '#0F172A' },
      { stop: 50, hex: '#FAFAFA', textColor: '#0F172A' },
      { stop: 75, hex: '#F5F5F6', textColor: '#0F172A' },
      { stop: 100, hex: '#F1F1F2', textColor: '#0F172A' },
      { stop: 200, hex: '#EBEBEC', textColor: '#0F172A' },
      { stop: 300, hex: '#E3E4E4', textColor: '#0F172A' },
      { stop: 400, hex: '#DADADA', textColor: '#0F172A' },
      { stop: 500, hex: '#D6D6D7', textColor: '#0F172A' },
      { stop: 600, hex: '#CFCFD0', textColor: '#0F172A' },
      { stop: 700, hex: '#C8C8C9', textColor: '#0F172A' },
      { stop: 800, hex: '#C1C1C2', textColor: '#0F172A' },
      { stop: 900, hex: '#BABABC', textColor: '#0F172A' },
      { stop: 925, hex: '#B5B6B7', textColor: '#0F172A' },
      { stop: 950, hex: '#AEAEB0', textColor: '#0F172A' },
      { stop: 975, hex: '#A8A8AA', textColor: '#0F172A' },
    ],
    tokenPath: 'color.neutral.white',
    cssPrefix: '--color-neutral-white',
    keyStops: [500, 25, 200],
  },
  {
    name: 'Grey',
    description: 'Borders, dividers, icon fills, placeholder text, muted labels. The workhorse between White and Ink.',
    root: '#6B6B6D',
    stops: [
      { stop: 25, hex: '#E8E8E9', textColor: '#0F172A' },
      { stop: 50, hex: '#DCDCDD', textColor: '#0F172A' },
      { stop: 75, hex: '#D0D0D1', textColor: '#0F172A' },
      { stop: 100, hex: '#C4C4C5', textColor: '#0F172A' },
      { stop: 200, hex: '#ADADAE', textColor: '#0F172A' },
      { stop: 300, hex: '#969698', textColor: '#0F172A' },
      { stop: 400, hex: '#808082', textColor: '#fff' },
      { stop: 500, hex: '#6B6B6D', textColor: '#fff' },
      { stop: 600, hex: '#595A5C', textColor: '#fff' },
      { stop: 700, hex: '#474849', textColor: '#fff' },
      { stop: 800, hex: '#373839', textColor: '#fff' },
      { stop: 900, hex: '#282829', textColor: '#fff' },
      { stop: 925, hex: '#1C1C1D', textColor: '#fff' },
      { stop: 950, hex: '#111112', textColor: '#fff' },
      { stop: 975, hex: '#070708', textColor: '#fff' },
    ],
    tokenPath: 'color.neutral.grey',
    cssPrefix: '--color-neutral-grey',
    keyStops: [500, 200, 400],
  },
  {
    name: 'Ink',
    description: 'Body text, headings, dark mode surfaces. 500 = darkest text value. Never #000000 — Ink.500 is a very dark near-black.',
    root: '#2E3033',
    stops: [
      { stop: 25, hex: '#808284', textColor: '#fff' },
      { stop: 50, hex: '#737577', textColor: '#fff' },
      { stop: 75, hex: '#676869', textColor: '#fff' },
      { stop: 100, hex: '#6C6D70', textColor: '#fff' },
      { stop: 200, hex: '#57595B', textColor: '#fff' },
      { stop: 300, hex: '#494B4D', textColor: '#fff' },
      { stop: 400, hex: '#3B3D3F', textColor: '#fff' },
      { stop: 500, hex: '#2E3033', textColor: '#fff' },
      { stop: 600, hex: '#262829', textColor: '#fff' },
      { stop: 700, hex: '#1F2122', textColor: '#fff' },
      { stop: 800, hex: '#191B1F', textColor: '#fff' },
      { stop: 900, hex: '#131519', textColor: '#fff' },
      { stop: 925, hex: '#0E1013', textColor: '#fff' },
      { stop: 950, hex: '#09090B', textColor: '#fff' },
      { stop: 975, hex: '#050507', textColor: '#fff' },
    ],
    tokenPath: 'color.neutral.ink',
    cssPrefix: '--color-neutral-ink',
    keyStops: [500, 200, 800],
  },
];

// Brand palettes
const brandPalettes: BrandPalette[] = [
  {
    id: 'leminiscate',
    name: 'Leminiscate',
    tagline: 'Real estate intelligence · Web · Mobile',
    accentColor: '#1C60C1',
    core: [
      {
        name: 'Primary',
        description: 'Dark Blue — Brand identity. Drives CTAs, navigation active states, links, and primary interactive elements.',
        root: '#1C60C1',
        stops: [
          { stop: 25, hex: '#E8EFFE', textColor: '#0F172A' },
          { stop: 50, hex: '#D2DFF3', textColor: '#0F172A' },
          { stop: 75, hex: '#BFCFED', textColor: '#0F172A' },
          { stop: 100, hex: '#ADC6E9', textColor: '#0F172A' },
          { stop: 200, hex: '#89ACDF', textColor: '#0F172A' },
          { stop: 300, hex: '#6593D5', textColor: '#0F172A' },
          { stop: 400, hex: '#4079CB', textColor: '#0F172A' },
          { stop: 500, hex: '#1C60C1', textColor: '#fff' },
          { stop: 600, hex: '#1C55A7', textColor: '#fff' },
          { stop: 700, hex: '#1B4A8D', textColor: '#fff' },
          { stop: 800, hex: '#1B3F73', textColor: '#fff' },
          { stop: 900, hex: '#1A3459', textColor: '#fff' },
          { stop: 925, hex: '#162A48', textColor: '#fff' },
          { stop: 950, hex: '#111C2A', textColor: '#fff' },
          { stop: 975, hex: '#081018', textColor: '#fff' },
        ],
        tokenPath: 'color.core.primary',
        cssPrefix: '--color-core-primary',
        keyStops: [500, 100, 700],
      },
      {
        name: 'Secondary',
        description: 'Sky Blue — Supports Primary. Used for highlights, hover states, secondary CTAs, and data visualisation accents.',
        root: '#40AAD4',
        stops: [
          { stop: 25, hex: '#EBF7FB', textColor: '#0F172A' },
          { stop: 50, hex: '#D9EEF6', textColor: '#0F172A' },
          { stop: 75, hex: '#C6E6F2', textColor: '#0F172A' },
          { stop: 100, hex: '#BAE0F0', textColor: '#0F172A' },
          { stop: 200, hex: '#9CD3E9', textColor: '#0F172A' },
          { stop: 300, hex: '#7DC5E2', textColor: '#0F172A' },
          { stop: 400, hex: '#5FB8DB', textColor: '#0F172A' },
          { stop: 500, hex: '#40AAD4', textColor: '#0F172A' },
          { stop: 600, hex: '#3A93B7', textColor: '#fff' },
          { stop: 700, hex: '#347C9A', textColor: '#fff' },
          { stop: 800, hex: '#2D657D', textColor: '#fff' },
          { stop: 900, hex: '#274E60', textColor: '#fff' },
          { stop: 925, hex: '#1E3D4C', textColor: '#fff' },
          { stop: 950, hex: '#152530', textColor: '#fff' },
          { stop: 975, hex: '#08131A', textColor: '#fff' },
        ],
        tokenPath: 'color.core.secondary',
        cssPrefix: '--color-core-secondary',
        keyStops: [500, 200, 600],
      },
      {
        name: 'Tertiary',
        description: 'Orange — Accent and energy. Used sparingly — badges, callout highlights, price tags, and emphasis moments.',
        root: '#ED651C',
        stops: [
          { stop: 25, hex: '#FEF3EB', textColor: '#0F172A' },
          { stop: 50, hex: '#FBE6D2', textColor: '#0F172A' },
          { stop: 75, hex: '#F9D5BB', textColor: '#0F172A' },
          { stop: 100, hex: '#F9C8AD', textColor: '#0F172A' },
          { stop: 200, hex: '#F6AF89', textColor: '#0F172A' },
          { stop: 300, hex: '#F39665', textColor: '#0F172A' },
          { stop: 400, hex: '#F07E40', textColor: '#0F172A' },
          { stop: 500, hex: '#ED651C', textColor: '#fff' },
          { stop: 600, hex: '#CB591C', textColor: '#fff' },
          { stop: 700, hex: '#A94D1D', textColor: '#fff' },
          { stop: 800, hex: '#87411D', textColor: '#fff' },
          { stop: 900, hex: '#65361E', textColor: '#fff' },
          { stop: 925, hex: '#4F2C18', textColor: '#fff' },
          { stop: 950, hex: '#432A1E', textColor: '#fff' },
          { stop: 975, hex: '#2C1A10', textColor: '#fff' },
        ],
        tokenPath: 'color.core.tertiary',
        cssPrefix: '--color-core-tertiary',
        keyStops: [500, 100, 700],
      },
    ],
    gradients: [
      { name: 'Brand Blend', token: 'gradient.brand-blend', stops: 'primary.500 → secondary.500', usage: 'Primary CTAs, hero backgrounds', gradient: 'linear-gradient(135deg, #1C60C1 0%, #40AAD4 100%)' },
      { name: 'Energy', token: 'gradient.energy', stops: 'secondary.500 → tertiary.500', usage: 'Promotional banners, feature callouts', gradient: 'linear-gradient(135deg, #40AAD4 0%, #ED651C 100%)' },
      { name: 'Arc', token: 'gradient.arc', stops: 'tertiary.500 → primary.500', usage: 'Illustrations, decorative brand moments', gradient: 'linear-gradient(135deg, #ED651C 0%, #1C60C1 100%)' },
      { name: 'Depth', token: 'gradient.depth', stops: 'primary.500 → neutral-ink.500', usage: 'Dark hero sections, card overlays', gradient: 'linear-gradient(135deg, #1C60C1 0%, #2E3033 100%)' },
      { name: 'Horizon', token: 'gradient.horizon', stops: 'primary.700 → secondary.500', usage: 'Map UI overlays, premium feature panels', gradient: 'linear-gradient(135deg, #1B4A8D 0%, #40AAD4 100%)' },
      { name: 'Full Spectrum', token: 'gradient.full-spectrum', stops: 'tertiary.500 → primary.500 → secondary.500', usage: 'Brand-only — splash screens, launch assets', gradient: 'linear-gradient(135deg, #ED651C 0%, #1C60C1 50%, #40AAD4 100%)' },
    ],
  },
  {
    id: 'aumraa',
    name: 'Aumraa',
    tagline: 'Design studio & product brand · Web · Marketing',
    accentColor: '#2F9E44',
    core: [
      {
        name: 'Primary',
        description: 'Forest Green — Brand identity. Rooted in growth, clarity, and long-term thinking. Drives all primary interactions.',
        root: '#2F9E44',
        stops: [
          { stop: 25, hex: '#EDFAF1', textColor: '#0F172A' },
          { stop: 50, hex: '#D3F5DC', textColor: '#0F172A' },
          { stop: 75, hex: '#B8EFC6', textColor: '#0F172A' },
          { stop: 100, hex: '#9FE8B3', textColor: '#0F172A' },
          { stop: 200, hex: '#78D98D', textColor: '#0F172A' },
          { stop: 300, hex: '#55CA6C', textColor: '#0F172A' },
          { stop: 400, hex: '#3BB554', textColor: '#0F172A' },
          { stop: 500, hex: '#2F9E44', textColor: '#fff' },
          { stop: 600, hex: '#288B3B', textColor: '#fff' },
          { stop: 700, hex: '#227832', textColor: '#fff' },
          { stop: 800, hex: '#1C6429', textColor: '#fff' },
          { stop: 900, hex: '#175121', textColor: '#fff' },
          { stop: 925, hex: '#123F1A', textColor: '#fff' },
          { stop: 950, hex: '#0C2D13', textColor: '#fff' },
          { stop: 975, hex: '#061A0B', textColor: '#fff' },
        ],
        tokenPath: 'color.core.primary',
        cssPrefix: '--color-core-primary',
        keyStops: [500, 100, 700],
      },
      {
        name: 'Secondary',
        description: 'Lime Yellow — Energetic accent. Adds momentum and optimism. Used for highlights, tags, and accent moments.',
        root: '#CFCF2A',
        stops: [
          { stop: 25, hex: '#FAFAE6', textColor: '#0F172A' },
          { stop: 50, hex: '#F4F4C3', textColor: '#0F172A' },
          { stop: 75, hex: '#EEEE9F', textColor: '#0F172A' },
          { stop: 100, hex: '#E8E87C', textColor: '#0F172A' },
          { stop: 200, hex: '#DEDE55', textColor: '#0F172A' },
          { stop: 300, hex: '#D6D63D', textColor: '#0F172A' },
          { stop: 400, hex: '#CECF30', textColor: '#0F172A' },
          { stop: 500, hex: '#CFCF2A', textColor: '#0F172A' },
          { stop: 600, hex: '#B4B424', textColor: '#fff' },
          { stop: 700, hex: '#98981E', textColor: '#fff' },
          { stop: 800, hex: '#7D7D18', textColor: '#fff' },
          { stop: 900, hex: '#636312', textColor: '#fff' },
          { stop: 925, hex: '#4E4E0D', textColor: '#fff' },
          { stop: 950, hex: '#383807', textColor: '#fff' },
          { stop: 975, hex: '#222201', textColor: '#fff' },
        ],
        tokenPath: 'color.core.secondary',
        cssPrefix: '--color-core-secondary',
        keyStops: [500, 200, 600],
      },
      {
        name: 'Tertiary',
        description: 'Royal Blue — Digital accent. Drives interactive and UI-forward elements — links, charts, interactive states.',
        root: '#2F6FED',
        stops: [
          { stop: 25, hex: '#EBF1FE', textColor: '#0F172A' },
          { stop: 50, hex: '#D0E0FC', textColor: '#0F172A' },
          { stop: 75, hex: '#B4CEF9', textColor: '#0F172A' },
          { stop: 100, hex: '#98BCF7', textColor: '#0F172A' },
          { stop: 200, hex: '#6E9BF3', textColor: '#0F172A' },
          { stop: 300, hex: '#4A7BEF', textColor: '#0F172A' },
          { stop: 400, hex: '#3A72EE', textColor: '#0F172A' },
          { stop: 500, hex: '#2F6FED', textColor: '#fff' },
          { stop: 600, hex: '#2860D0', textColor: '#fff' },
          { stop: 700, hex: '#2151B2', textColor: '#fff' },
          { stop: 800, hex: '#1A4295', textColor: '#fff' },
          { stop: 900, hex: '#143477', textColor: '#fff' },
          { stop: 925, hex: '#0F275A', textColor: '#fff' },
          { stop: 950, hex: '#091A3C', textColor: '#fff' },
          { stop: 975, hex: '#040D1E', textColor: '#fff' },
        ],
        tokenPath: 'color.core.tertiary',
        cssPrefix: '--color-core-tertiary',
        keyStops: [500, 100, 700],
      },
    ],
    gradients: [
      { name: 'Growth', token: 'gradient.growth', stops: 'primary.500 → secondary.500', usage: 'Hero sections, brand moments', gradient: 'linear-gradient(135deg, #2F9E44 0%, #CFCF2A 100%)' },
      { name: 'Momentum', token: 'gradient.momentum', stops: 'primary.500 → tertiary.500', usage: 'Feature callouts, CTAs', gradient: 'linear-gradient(135deg, #2F9E44 0%, #2F6FED 100%)' },
      { name: 'Clarity', token: 'gradient.clarity', stops: 'secondary.500 → tertiary.500', usage: 'Service cards, portfolio highlights', gradient: 'linear-gradient(135deg, #CFCF2A 0%, #2F6FED 100%)' },
      { name: 'Deep Root', token: 'gradient.deep-root', stops: 'primary.500 → neutral-ink.500', usage: 'Dark panels, footer areas', gradient: 'linear-gradient(135deg, #2F9E44 0%, #2E3033 100%)' },
      { name: 'Canopy', token: 'gradient.canopy', stops: 'primary.700 → primary.500 → secondary.500', usage: 'Premium product tiers, studio branding', gradient: 'linear-gradient(135deg, #227832 0%, #2F9E44 50%, #CFCF2A 100%)' },
    ],
  },
  {
    id: 'maligai-manager',
    name: 'Maligai Manager',
    tagline: 'Grocery & inventory management · Mobile',
    accentColor: '#D97706',
    core: [
      {
        name: 'Primary',
        description: 'Market Amber — Warm, approachable, action-oriented. Reflects the energy of a grocery market environment.',
        root: '#D97706',
        stops: [
          { stop: 25, hex: '#FFFBF0', textColor: '#0F172A' },
          { stop: 50, hex: '#FEF3C7', textColor: '#0F172A' },
          { stop: 75, hex: '#FDE8A0', textColor: '#0F172A' },
          { stop: 100, hex: '#FBDCA7', textColor: '#0F172A' },
          { stop: 200, hex: '#F9C96A', textColor: '#0F172A' },
          { stop: 300, hex: '#F5B53A', textColor: '#0F172A' },
          { stop: 400, hex: '#EDA020', textColor: '#0F172A' },
          { stop: 500, hex: '#D97706', textColor: '#fff' },
          { stop: 600, hex: '#BE6A05', textColor: '#fff' },
          { stop: 700, hex: '#A05C04', textColor: '#fff' },
          { stop: 800, hex: '#824B04', textColor: '#fff' },
          { stop: 900, hex: '#643A03', textColor: '#fff' },
          { stop: 925, hex: '#4C2C02', textColor: '#fff' },
          { stop: 950, hex: '#341E01', textColor: '#fff' },
          { stop: 975, hex: '#1C0F00', textColor: '#fff' },
        ],
        tokenPath: 'color.core.primary',
        cssPrefix: '--color-core-primary',
        keyStops: [500, 100, 700],
      },
      {
        name: 'Secondary',
        description: 'Fresh Green — Freshness, stock availability, positive inventory states. Complements the amber primary.',
        root: '#16A34A',
        stops: [
          { stop: 25, hex: '#E8F8EE', textColor: '#0F172A' },
          { stop: 50, hex: '#D0EDDB', textColor: '#0F172A' },
          { stop: 75, hex: '#BBDFC8', textColor: '#0F172A' },
          { stop: 100, hex: '#ABDEBE', textColor: '#0F172A' },
          { stop: 200, hex: '#86CFA1', textColor: '#0F172A' },
          { stop: 300, hex: '#61C084', textColor: '#0F172A' },
          { stop: 400, hex: '#3BB267', textColor: '#0F172A' },
          { stop: 500, hex: '#16A34A', textColor: '#fff' },
          { stop: 600, hex: '#168D43', textColor: '#fff' },
          { stop: 700, hex: '#17773C', textColor: '#fff' },
          { stop: 800, hex: '#176235', textColor: '#fff' },
          { stop: 900, hex: '#184C2E', textColor: '#fff' },
          { stop: 925, hex: '#183628', textColor: '#fff' },
          { stop: 950, hex: '#0F2218', textColor: '#fff' },
          { stop: 975, hex: '#060E09', textColor: '#fff' },
        ],
        tokenPath: 'color.core.secondary',
        cssPrefix: '--color-core-secondary',
        keyStops: [500, 200, 600],
      },
      {
        name: 'Tertiary',
        description: 'Terracotta — Earthy accent. Used for categories, tags, and section differentiation in list views.',
        root: '#C2410C',
        stops: [
          { stop: 25, hex: '#FEF0EB', textColor: '#0F172A' },
          { stop: 50, hex: '#FDDDD1', textColor: '#0F172A' },
          { stop: 75, hex: '#FCCAB6', textColor: '#0F172A' },
          { stop: 100, hex: '#FAB89B', textColor: '#0F172A' },
          { stop: 200, hex: '#F69370', textColor: '#0F172A' },
          { stop: 300, hex: '#F27045', textColor: '#0F172A' },
          { stop: 400, hex: '#E75520', textColor: '#0F172A' },
          { stop: 500, hex: '#C2410C', textColor: '#fff' },
          { stop: 600, hex: '#A8380A', textColor: '#fff' },
          { stop: 700, hex: '#8D2F09', textColor: '#fff' },
          { stop: 800, hex: '#732607', textColor: '#fff' },
          { stop: 900, hex: '#581E05', textColor: '#fff' },
          { stop: 925, hex: '#421705', textColor: '#fff' },
          { stop: 950, hex: '#2C1003', textColor: '#fff' },
          { stop: 975, hex: '#160801', textColor: '#fff' },
        ],
        tokenPath: 'color.core.tertiary',
        cssPrefix: '--color-core-tertiary',
        keyStops: [500, 100, 700],
      },
    ],
    gradients: [
      { name: 'Market', token: 'gradient.market', stops: 'primary.500 → secondary.500', usage: 'App header, category banners', gradient: 'linear-gradient(135deg, #D97706 0%, #16A34A 100%)' },
      { name: 'Harvest', token: 'gradient.harvest', stops: 'primary.500 → tertiary.500', usage: 'Promotional tiles, offer cards', gradient: 'linear-gradient(135deg, #D97706 0%, #C2410C 100%)' },
      { name: 'Shelf', token: 'gradient.shelf', stops: 'primary.600 → secondary.500', usage: 'Empty state illustrations', gradient: 'linear-gradient(135deg, #BE6A05 0%, #16A34A 100%)' },
    ],
  },
  {
    id: 'ullagellam',
    name: 'Ullagellam',
    tagline: 'Explore & discover around you · Mobile',
    accentColor: '#7C3AED',
    core: [
      {
        name: 'Primary',
        description: 'Discovery Violet — Curiosity, exploration, discovery. Drives navigation, place pins, and featured content.',
        root: '#7C3AED',
        stops: [
          { stop: 25, hex: '#F5F0FF', textColor: '#0F172A' },
          { stop: 50, hex: '#EBE0FF', textColor: '#0F172A' },
          { stop: 75, hex: '#D9C8FE', textColor: '#0F172A' },
          { stop: 100, hex: '#C8B0FD', textColor: '#0F172A' },
          { stop: 200, hex: '#A882FA', textColor: '#0F172A' },
          { stop: 300, hex: '#8D5CF6', textColor: '#0F172A' },
          { stop: 400, hex: '#7C3AED', textColor: '#fff' },
          { stop: 500, hex: '#6D28D9', textColor: '#fff' },
          { stop: 600, hex: '#5B21B6', textColor: '#fff' },
          { stop: 700, hex: '#4C1D95', textColor: '#fff' },
          { stop: 800, hex: '#3B1678', textColor: '#fff' },
          { stop: 900, hex: '#2C105C', textColor: '#fff' },
          { stop: 925, hex: '#1E0B3E', textColor: '#fff' },
          { stop: 950, hex: '#110620', textColor: '#fff' },
          { stop: 975, hex: '#060210', textColor: '#fff' },
        ],
        tokenPath: 'color.core.primary',
        cssPrefix: '--color-core-primary',
        keyStops: [500, 100, 700],
      },
      {
        name: 'Secondary',
        description: 'Sky Teal — Calm, spatial, wayfinding. Used for map accents, distance indicators, and route highlights.',
        root: '#0891B2',
        stops: [
          { stop: 25, hex: '#ECFEFF', textColor: '#0F172A' },
          { stop: 50, hex: '#CFFAFE', textColor: '#0F172A' },
          { stop: 75, hex: '#A5F3FC', textColor: '#0F172A' },
          { stop: 100, hex: '#67E8F9', textColor: '#0F172A' },
          { stop: 200, hex: '#22D3EE', textColor: '#0F172A' },
          { stop: 300, hex: '#06B6D4', textColor: '#0F172A' },
          { stop: 400, hex: '#0891B2', textColor: '#fff' },
          { stop: 500, hex: '#0E7490', textColor: '#fff' },
          { stop: 600, hex: '#155E75', textColor: '#fff' },
          { stop: 700, hex: '#164E63', textColor: '#fff' },
          { stop: 800, hex: '#0F3D50', textColor: '#fff' },
          { stop: 900, hex: '#0A2D3C', textColor: '#fff' },
          { stop: 925, hex: '#071E28', textColor: '#fff' },
          { stop: 950, hex: '#040F14', textColor: '#fff' },
          { stop: 975, hex: '#010507', textColor: '#fff' },
        ],
        tokenPath: 'color.core.secondary',
        cssPrefix: '--color-core-secondary',
        keyStops: [500, 200, 600],
      },
      {
        name: 'Tertiary',
        description: 'Coral — Warmth and energy for featured spots, trending places, and social engagement elements.',
        root: '#E11D48',
        stops: [
          { stop: 25, hex: '#FFF1F2', textColor: '#0F172A' },
          { stop: 50, hex: '#FFE4E6', textColor: '#0F172A' },
          { stop: 75, hex: '#FECDD3', textColor: '#0F172A' },
          { stop: 100, hex: '#FDA4AF', textColor: '#0F172A' },
          { stop: 200, hex: '#FB7185', textColor: '#0F172A' },
          { stop: 300, hex: '#F43F5E', textColor: '#0F172A' },
          { stop: 400, hex: '#E11D48', textColor: '#fff' },
          { stop: 500, hex: '#BE123C', textColor: '#fff' },
          { stop: 600, hex: '#9F1239', textColor: '#fff' },
          { stop: 700, hex: '#881337', textColor: '#fff' },
          { stop: 800, hex: '#700F2D', textColor: '#fff' },
          { stop: 900, hex: '#590C24', textColor: '#fff' },
          { stop: 925, hex: '#42091A', textColor: '#fff' },
          { stop: 950, hex: '#2B0511', textColor: '#fff' },
          { stop: 975, hex: '#140208', textColor: '#fff' },
        ],
        tokenPath: 'color.core.tertiary',
        cssPrefix: '--color-core-tertiary',
        keyStops: [500, 100, 700],
      },
    ],
    gradients: [
      { name: 'Explore', token: 'gradient.explore', stops: 'primary.500 → secondary.500', usage: 'Splash screen, hero banners', gradient: 'linear-gradient(135deg, #6D28D9 0%, #0E7490 100%)' },
      { name: 'Discover', token: 'gradient.discover', stops: 'primary.500 → tertiary.500', usage: 'Featured place cards', gradient: 'linear-gradient(135deg, #6D28D9 0%, #BE123C 100%)' },
      { name: 'Nightlife', token: 'gradient.nightlife', stops: 'primary.800 → secondary.600', usage: 'Evening mode, dark category tiles', gradient: 'linear-gradient(135deg, #3B1678 0%, #155E75 100%)' },
    ],
  },
  {
    id: 'ilakh',
    name: 'Ilakh',
    tagline: 'Goal tracking & personal finance · Web · Mobile',
    accentColor: '#0369A1',
    core: [
      {
        name: 'Primary',
        description: 'Ocean Blue — Trust, clarity, and focus. Drives dashboards, goal progress indicators, and primary actions.',
        root: '#0369A1',
        stops: [
          { stop: 25, hex: '#EFF8FF', textColor: '#0F172A' },
          { stop: 50, hex: '#DBEEFE', textColor: '#0F172A' },
          { stop: 75, hex: '#BFE0FD', textColor: '#0F172A' },
          { stop: 100, hex: '#93CBFC', textColor: '#0F172A' },
          { stop: 200, hex: '#60AEFA', textColor: '#0F172A' },
          { stop: 300, hex: '#3B91F7', textColor: '#0F172A' },
          { stop: 400, hex: '#1D76E4', textColor: '#0F172A' },
          { stop: 500, hex: '#0369A1', textColor: '#fff' },
          { stop: 600, hex: '#025985', textColor: '#fff' },
          { stop: 700, hex: '#014668', textColor: '#fff' },
          { stop: 800, hex: '#01344C', textColor: '#fff' },
          { stop: 900, hex: '#012230', textColor: '#fff' },
          { stop: 925, hex: '#011521', textColor: '#fff' },
          { stop: 950, hex: '#000912', textColor: '#fff' },
          { stop: 975, hex: '#000406', textColor: '#fff' },
        ],
        tokenPath: 'color.core.primary',
        cssPrefix: '--color-core-primary',
        keyStops: [500, 100, 700],
      },
      {
        name: 'Secondary',
        description: 'Emerald — Goal achieved, savings milestones, positive financial momentum. Pairs cleanly with Ocean Blue.',
        root: '#059669',
        stops: [
          { stop: 25, hex: '#ECFDF5', textColor: '#0F172A' },
          { stop: 50, hex: '#D1FAE5', textColor: '#0F172A' },
          { stop: 75, hex: '#A7F3D0', textColor: '#0F172A' },
          { stop: 100, hex: '#6EE7B7', textColor: '#0F172A' },
          { stop: 200, hex: '#34D399', textColor: '#0F172A' },
          { stop: 300, hex: '#10B981', textColor: '#0F172A' },
          { stop: 400, hex: '#059669', textColor: '#fff' },
          { stop: 500, hex: '#047857', textColor: '#fff' },
          { stop: 600, hex: '#065F46', textColor: '#fff' },
          { stop: 700, hex: '#064E3B', textColor: '#fff' },
          { stop: 800, hex: '#053D2F', textColor: '#fff' },
          { stop: 900, hex: '#042C22', textColor: '#fff' },
          { stop: 925, hex: '#031A14', textColor: '#fff' },
          { stop: 950, hex: '#010D0A', textColor: '#fff' },
          { stop: 975, hex: '#000402', textColor: '#fff' },
        ],
        tokenPath: 'color.core.secondary',
        cssPrefix: '--color-core-secondary',
        keyStops: [500, 200, 600],
      },
      {
        name: 'Tertiary',
        description: 'Slate Indigo — Analytics, chart lines, secondary data series. Adds depth without competing with primary.',
        root: '#4338CA',
        stops: [
          { stop: 25, hex: '#EEF2FF', textColor: '#0F172A' },
          { stop: 50, hex: '#E0E7FF', textColor: '#0F172A' },
          { stop: 75, hex: '#C7D2FE', textColor: '#0F172A' },
          { stop: 100, hex: '#A5B4FC', textColor: '#0F172A' },
          { stop: 200, hex: '#818CF8', textColor: '#0F172A' },
          { stop: 300, hex: '#6366F1', textColor: '#0F172A' },
          { stop: 400, hex: '#4F46E5', textColor: '#0F172A' },
          { stop: 500, hex: '#4338CA', textColor: '#fff' },
          { stop: 600, hex: '#3730A3', textColor: '#fff' },
          { stop: 700, hex: '#312E81', textColor: '#fff' },
          { stop: 800, hex: '#271F6A', textColor: '#fff' },
          { stop: 900, hex: '#1D1652', textColor: '#fff' },
          { stop: 925, hex: '#130D3A', textColor: '#fff' },
          { stop: 950, hex: '#090622', textColor: '#fff' },
          { stop: 975, hex: '#03020A', textColor: '#fff' },
        ],
        tokenPath: 'color.core.tertiary',
        cssPrefix: '--color-core-tertiary',
        keyStops: [500, 100, 700],
      },
    ],
    gradients: [
      { name: 'Goal', token: 'gradient.goal', stops: 'primary.500 → secondary.500', usage: 'Progress bars, achievement states', gradient: 'linear-gradient(135deg, #0369A1 0%, #047857 100%)' },
      { name: 'Focus', token: 'gradient.focus', stops: 'primary.500 → tertiary.500', usage: 'Dashboard headers, summary cards', gradient: 'linear-gradient(135deg, #0369A1 0%, #4338CA 100%)' },
      { name: 'Milestone', token: 'gradient.milestone', stops: 'secondary.500 → tertiary.500', usage: 'Celebration moments, streak UI', gradient: 'linear-gradient(135deg, #047857 0%, #4338CA 100%)' },
    ],
  },
  {
    id: 'technocracy',
    name: 'Technocracy',
    tagline: 'Admin dashboard & analytics · Web · Dark-mode first',
    accentColor: '#8B5CF6',
    core: [
      {
        name: 'Primary',
        description: 'Electric Violet — Power, intelligence, and control. Drives CTAs, navigation active states, interactive elements, and focus rings across the dense dark dashboard.',
        root: '#8B5CF6',
        stops: [
          { stop: 25, hex: '#F5F3FF', textColor: '#0F172A' },
          { stop: 50, hex: '#EDE9FE', textColor: '#0F172A' },
          { stop: 75, hex: '#DDD6FE', textColor: '#0F172A' },
          { stop: 100, hex: '#C4B5FD', textColor: '#0F172A' },
          { stop: 200, hex: '#A78BFA', textColor: '#0F172A' },
          { stop: 300, hex: '#8B5CF6', textColor: '#fff' },
          { stop: 400, hex: '#7C3AED', textColor: '#fff' },
          { stop: 500, hex: '#6D28D9', textColor: '#fff' },
          { stop: 600, hex: '#5B21B6', textColor: '#fff' },
          { stop: 700, hex: '#4C1D95', textColor: '#fff' },
          { stop: 800, hex: '#3B1F7C', textColor: '#fff' },
          { stop: 900, hex: '#2A1660', textColor: '#fff' },
          { stop: 925, hex: '#1C0E47', textColor: '#fff' },
          { stop: 950, hex: '#100830', textColor: '#fff' },
          { stop: 975, hex: '#060318', textColor: '#fff' },
        ],
        tokenPath: 'thcy.color.primary',
        cssPrefix: '--thcy-color-primary',
        keyStops: [300, 100, 400],
      },
      {
        name: 'Secondary',
        description: 'Indigo — Depth and data. Used for secondary actions, chart series, analytics accents, and table row hover states.',
        root: '#6366F1',
        stops: [
          { stop: 25, hex: '#EEF2FF', textColor: '#0F172A' },
          { stop: 50, hex: '#E0E7FF', textColor: '#0F172A' },
          { stop: 75, hex: '#C7D2FE', textColor: '#0F172A' },
          { stop: 100, hex: '#A5B4FC', textColor: '#0F172A' },
          { stop: 200, hex: '#818CF8', textColor: '#0F172A' },
          { stop: 300, hex: '#6366F1', textColor: '#fff' },
          { stop: 400, hex: '#4F46E5', textColor: '#fff' },
          { stop: 500, hex: '#4338CA', textColor: '#fff' },
          { stop: 600, hex: '#3730A3', textColor: '#fff' },
          { stop: 700, hex: '#312E81', textColor: '#fff' },
          { stop: 800, hex: '#271F6A', textColor: '#fff' },
          { stop: 900, hex: '#1E1B4B', textColor: '#fff' },
          { stop: 925, hex: '#130E36', textColor: '#fff' },
          { stop: 950, hex: '#090621', textColor: '#fff' },
          { stop: 975, hex: '#03020E', textColor: '#fff' },
        ],
        tokenPath: 'thcy.color.secondary',
        cssPrefix: '--thcy-color-secondary',
        keyStops: [300, 100, 400],
      },
      {
        name: 'Dark Surface',
        description: 'Near-black — The foundation of the dashboard. Background layers from near-black → absolute dark, creating depth without flat darkness.',
        root: '#0D1117',
        stops: [
          { stop: 25, hex: '#374151', textColor: '#fff' },
          { stop: 50, hex: '#2D3748', textColor: '#fff' },
          { stop: 75, hex: '#252D3B', textColor: '#fff' },
          { stop: 100, hex: '#1F2937', textColor: '#fff' },
          { stop: 200, hex: '#1A2232', textColor: '#fff' },
          { stop: 300, hex: '#161C2A', textColor: '#fff' },
          { stop: 400, hex: '#111827', textColor: '#fff' },
          { stop: 500, hex: '#0D1117', textColor: '#fff' },
          { stop: 600, hex: '#0B0F1A', textColor: '#fff' },
          { stop: 700, hex: '#090C14', textColor: '#fff' },
          { stop: 800, hex: '#080C12', textColor: '#fff' },
          { stop: 900, hex: '#06090F', textColor: '#fff' },
          { stop: 925, hex: '#04060A', textColor: '#fff' },
          { stop: 950, hex: '#030407', textColor: '#fff' },
          { stop: 975, hex: '#010203', textColor: '#fff' },
        ],
        tokenPath: 'thcy.color.dark-surface',
        cssPrefix: '--thcy-color-dark-surface',
        keyStops: [500, 400, 800],
      },
    ],
    gradients: [
      { name: 'Command', token: 'gradient.command', stops: 'primary.300 → secondary.300', usage: 'Hero panels, featured metric cards', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' },
      { name: 'System', token: 'gradient.system', stops: 'secondary.300 → primary.500', usage: 'Empty states, loading skeletons, illustration backgrounds', gradient: 'linear-gradient(135deg, #6366F1 0%, #6D28D9 100%)' },
      { name: 'Depth', token: 'gradient.depth', stops: 'primary.300 → surface.500', usage: 'Card overlays, modal backdrops', gradient: 'linear-gradient(135deg, #8B5CF6 0%, #0D1117 100%)' },
      { name: 'Abyss', token: 'gradient.abyss', stops: 'surface.400 → surface.800', usage: 'Sidebar rail, scrollbar tracks, dense panel dividers', gradient: 'linear-gradient(180deg, #111827 0%, #080C12 100%)' },
      { name: 'Signal', token: 'gradient.signal', stops: 'primary.200 → secondary.200', usage: 'Brand-only — splash screens, onboarding hero', gradient: 'linear-gradient(135deg, #A78BFA 0%, #818CF8 100%)' },
    ],
  },
  {
    id: 'yakaizen',
    name: 'Yakaizen',
    tagline: 'Habit & continuous improvement · Mobile · Smartwatch',
    accentColor: '#06B6D4',
    core: [
      {
        name: 'Primary',
        description: 'Charcoal — Discipline, focus, and commitment. Dark-first product — Charcoal drives all primary surfaces and actions.',
        root: '#334155',
        stops: [
          { stop: 25, hex: '#F8FAFC', textColor: '#0F172A' },
          { stop: 50, hex: '#F1F5F9', textColor: '#0F172A' },
          { stop: 75, hex: '#E2E8F0', textColor: '#0F172A' },
          { stop: 100, hex: '#CBD5E1', textColor: '#0F172A' },
          { stop: 200, hex: '#94A3B8', textColor: '#0F172A' },
          { stop: 300, hex: '#64748B', textColor: '#fff' },
          { stop: 400, hex: '#475569', textColor: '#fff' },
          { stop: 500, hex: '#334155', textColor: '#fff' },
          { stop: 600, hex: '#1E293B', textColor: '#fff' },
          { stop: 700, hex: '#0F172A', textColor: '#fff' },
          { stop: 800, hex: '#0B1120', textColor: '#fff' },
          { stop: 900, hex: '#070B16', textColor: '#fff' },
          { stop: 925, hex: '#04060D', textColor: '#fff' },
          { stop: 950, hex: '#020408', textColor: '#fff' },
          { stop: 975, hex: '#010203', textColor: '#fff' },
        ],
        tokenPath: 'color.core.primary',
        cssPrefix: '--color-core-primary',
        keyStops: [500, 100, 700],
      },
      {
        name: 'Secondary',
        description: 'Electric Cyan — Energy, momentum, and progress metrics. High-contrast accent designed for dark backgrounds and watch faces.',
        root: '#06B6D4',
        stops: [
          { stop: 25, hex: '#ECFEFF', textColor: '#0F172A' },
          { stop: 50, hex: '#CFFAFE', textColor: '#0F172A' },
          { stop: 75, hex: '#A5F3FC', textColor: '#0F172A' },
          { stop: 100, hex: '#67E8F9', textColor: '#0F172A' },
          { stop: 200, hex: '#22D3EE', textColor: '#0F172A' },
          { stop: 300, hex: '#06B6D4', textColor: '#0F172A' },
          { stop: 400, hex: '#0891B2', textColor: '#fff' },
          { stop: 500, hex: '#0E7490', textColor: '#fff' },
          { stop: 600, hex: '#155E75', textColor: '#fff' },
          { stop: 700, hex: '#164E63', textColor: '#fff' },
          { stop: 800, hex: '#0F3D50', textColor: '#fff' },
          { stop: 900, hex: '#0A2D3C', textColor: '#fff' },
          { stop: 925, hex: '#071E28', textColor: '#fff' },
          { stop: 950, hex: '#040F14', textColor: '#fff' },
          { stop: 975, hex: '#010507', textColor: '#fff' },
        ],
        tokenPath: 'color.core.secondary',
        cssPrefix: '--color-core-secondary',
        keyStops: [500, 200, 600],
      },
      {
        name: 'Tertiary',
        description: 'Volt Green — Habit streaks, completion rings, personal records. High-energy accent for motivational moments.',
        root: '#65A30D',
        stops: [
          { stop: 25, hex: '#F7FEE7', textColor: '#0F172A' },
          { stop: 50, hex: '#ECFCCB', textColor: '#0F172A' },
          { stop: 75, hex: '#D9F99D', textColor: '#0F172A' },
          { stop: 100, hex: '#BEF264', textColor: '#0F172A' },
          { stop: 200, hex: '#A3E635', textColor: '#0F172A' },
          { stop: 300, hex: '#84CC16', textColor: '#0F172A' },
          { stop: 400, hex: '#65A30D', textColor: '#fff' },
          { stop: 500, hex: '#4D7C0F', textColor: '#fff' },
          { stop: 600, hex: '#3F6212', textColor: '#fff' },
          { stop: 700, hex: '#365314', textColor: '#fff' },
          { stop: 800, hex: '#2A4010', textColor: '#fff' },
          { stop: 900, hex: '#1E2D0B', textColor: '#fff' },
          { stop: 925, hex: '#131C07', textColor: '#fff' },
          { stop: 950, hex: '#090E03', textColor: '#fff' },
          { stop: 975, hex: '#030501', textColor: '#fff' },
        ],
        tokenPath: 'color.core.tertiary',
        cssPrefix: '--color-core-tertiary',
        keyStops: [500, 100, 700],
      },
    ],
    gradients: [
      { name: 'Streak', token: 'gradient.streak', stops: 'primary.500 → secondary.500', usage: 'Active habit rings, watch complications', gradient: 'linear-gradient(135deg, #334155 0%, #0E7490 100%)' },
      { name: 'Record', token: 'gradient.record', stops: 'secondary.500 → tertiary.500', usage: 'Personal best moments, achievement unlocks', gradient: 'linear-gradient(135deg, #0E7490 0%, #4D7C0F 100%)' },
      { name: 'Night Mode', token: 'gradient.night-mode', stops: 'primary.900 → secondary.500', usage: 'Smartwatch face, dark dashboard', gradient: 'linear-gradient(135deg, #070B16 0%, #0E7490 100%)' },
    ],
  },
];

// Semantic tokens (shared)
const semanticTokens = [
  { token: 'color.brand.default', references: 'color.core.primary.500', usage: 'Primary CTAs, links, active nav, focus rings' },
  { token: 'color.brand.subtle', references: 'color.core.primary.100', usage: 'Tinted backgrounds behind brand elements' },
  { token: 'color.brand.strong', references: 'color.core.primary.700', usage: 'Hover states on brand elements' },
  { token: 'color.brand.on-brand', references: 'neutral.white.500', usage: 'Text/icons placed on top of brand.default' },
  { token: 'color.accent.default', references: 'color.core.secondary.500', usage: 'Secondary actions, highlights, data accents' },
  { token: 'color.feedback.positive', references: 'color.feedback.positive.500', usage: 'Success messages, completed states, go actions' },
  { token: 'color.feedback.warning', references: 'color.feedback.warning.500', usage: 'Caution alerts, pending states, review needed' },
  { token: 'color.feedback.negative', references: 'color.feedback.negative.500', usage: 'Errors, destructive actions, critical alerts' },
  { token: 'color.surface.page', references: 'color.neutral.white.500', usage: 'Main page / screen background' },
  { token: 'color.border.default', references: 'color.neutral.grey.200', usage: 'Default borders, dividers' },
  { token: 'color.text.primary', references: 'color.neutral.ink.500', usage: 'Body text, headings, primary labels' },
];

function ColorSwatch({ stop, isRoot, onCopy }: { stop: ColorStop; isRoot: boolean; onCopy: (hex: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(stop.hex);
    onCopy(stop.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`group flex-1 min-w-[52px] cursor-pointer transition-all ${isRoot ? 'scale-105' : 'hover:scale-105'}`}
      title={`${stop.stop} · ${stop.hex}`}
    >
      <div
        className={`h-16 rounded-t-lg relative flex items-center justify-center ${isRoot ? 'ring-2 ring-offset-2 ring-teal-500 dark:ring-teal-400' : ''}`}
        style={{ backgroundColor: stop.hex }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg">
          {copied ? (
            <Check size={14} color={stop.textColor} />
          ) : (
            <Copy size={14} color={stop.textColor} />
          )}
        </div>
      </div>
      <div className="pt-1.5 pb-2 px-0.5">
        <p className={`text-slate-600 dark:text-slate-400 m-0 ${isRoot ? 'font-bold' : 'font-semibold'}`} style={{ fontSize: '0.7rem', fontFamily: 'var(--font-sans)' }}>
          {stop.stop}{isRoot ? ' ★' : ''}
        </p>
        <p className="text-slate-400 dark:text-slate-600 m-0" style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)' }}>
          {stop.hex}
        </p>
      </div>
    </button>
  );
}

function ScaleRow({ scale, locked = false }: { scale: ColorScale; locked?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [lastCopied, setLastCopied] = useState<string>('');

  return (
    <div className="mb-8">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-slate-900 dark:text-slate-100 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem' }}>
              {scale.name}
            </h4>
            {locked && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400" style={{ fontSize: '0.7rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                <Lock size={10} />
                Shared · Locked
              </span>
            )}
          </div>
          <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
            {scale.description}
          </p>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {scale.stops.map(stop => (
          <ColorSwatch
            key={stop.stop}
            stop={stop}
            isRoot={stop.hex === scale.root}
            onCopy={setLastCopied}
          />
        ))}
      </div>

      <div className="mt-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1 transition-colors"
          style={{ fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide' : 'View'} all {scale.stops.length} token definitions
        </button>

        {expanded && (
          <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700/60">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60">
                  <th className="px-3 py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.7rem' }}>JSON Token</th>
                  <th className="px-3 py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.7rem' }}>CSS Variable</th>
                  <th className="px-3 py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.7rem' }}>Stop</th>
                  <th className="px-3 py-2 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.7rem' }}>Primary Usage</th>
                </tr>
              </thead>
              <tbody>
                {scale.stops.map((s, i) => {
                  const isKey = scale.keyStops?.includes(s.stop) ?? s.stop === 500;
                  return (
                    <tr key={s.stop} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}>
                      <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <code className={isKey ? 'text-teal-600 dark:text-teal-400 font-semibold' : 'text-slate-500 dark:text-slate-500'} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                          {scale.tokenPath}.{s.stop}
                        </code>
                      </td>
                      <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <code className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
                          var({scale.cssPrefix}{s.stop})
                        </code>
                      </td>
                      <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-800" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
                        <span className={isKey ? 'text-slate-800 dark:text-slate-200 font-semibold' : 'text-slate-500 dark:text-slate-500'}>
                          {s.stop}{isKey ? ' ★' : ''}
                        </span>
                      </td>
                      <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
                        {STOP_USAGE[s.stop] ?? ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function GradientChip({ gradient }: { gradient: GradientInfo }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 rounded-lg"
        style={{ background: gradient.gradient }}
      />
      <div>
        <h5 className="text-slate-900 dark:text-slate-100 m-0 mb-0.5" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.85rem' }}>
          {gradient.name}
        </h5>
        <p className="text-teal-600 dark:text-teal-400 m-0 mb-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
          {gradient.token}
        </p>
        <p className="text-slate-500 dark:text-slate-400 m-0 mb-1" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
          {gradient.stops}
        </p>
        <p className="text-slate-500 dark:text-slate-400 m-0" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem' }}>
          {gradient.usage}
        </p>
      </div>
    </div>
  );
}

const BRAND_ORDER = ['aumraa', 'technocracy', 'leminiscate', 'maligai-manager', 'ullagellam', 'ilakh', 'yakaizen'];
const sortedBrands = [...brandPalettes].sort((a, b) => {
  const ai = BRAND_ORDER.indexOf(a.id);
  const bi = BRAND_ORDER.indexOf(b.id);
  return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
});

export function ColorsPage() {
  const [activeTab, setActiveTab] = useState('aumraa');
  const activeBrand = sortedBrands.find(b => b.id === activeTab) || sortedBrands[0];

  return (
    <div className="max-w-7xl px-6 lg:px-10 py-10">
      <PageHeader
        title="Colors"
        description="Breathe's multi-brand color system with 10 scales per brand: 3 Core (brand-specific), 3 Feedback (shared), 3 Neutral (shared). Each scale has 15 stops with stop 500 as the root."
        section="Foundations"
        badge="Multi-Brand"
        badgeColor="teal"
      />

      {/* Brand Tabs — sticky below TopBar (h-16 = 64px) */}
      <div className="sticky top-16 z-20 bg-slate-50 dark:bg-slate-950 -mx-6 lg:-mx-10 px-6 lg:px-10 mb-8 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="flex gap-0 min-w-max" role="tablist">
          {sortedBrands.map(brand => {
            const isActive = brand.id === activeTab;
            return (
              <button
                key={brand.id}
                onClick={() => setActiveTab(brand.id)}
                role="tab"
                aria-selected={isActive}
                className={`relative px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
                style={{
                  borderBottomColor: isActive ? brand.accentColor : undefined,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                {brand.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Tagline */}
      <p className="text-slate-500 dark:text-slate-400 mb-10 italic" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
        {activeBrand.tagline}
      </p>

      {/* Group 1: Core */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-1 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Group 1 — Core
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Brand-specific scales. Click any swatch to copy hex. Stop 500 (★) is the root value.
        </p>
        {activeBrand.core.map(scale => (
          <ScaleRow key={scale.name} scale={scale} />
        ))}
      </section>

      {/* Group 2: Feedback */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-1 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Group 2 — Feedback
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Shared across all brands. Fixed meanings: Positive = Green, Warning = Amber, Negative = Red.
        </p>
        {feedbackScales.map(scale => (
          <ScaleRow key={scale.name} scale={scale} locked />
        ))}
      </section>

      {/* Group 3: Neutral */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-1 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Group 3 — Neutral
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Shared across all brands. White for surfaces, Grey for UI chrome, Ink for text and dark backgrounds.
        </p>
        {neutralScales.map(scale => (
          <ScaleRow key={scale.name} scale={scale} locked />
        ))}
      </section>

      {/* Gradients */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-1 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Gradients
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Brand-specific. References Core scales only. Default angle: 135deg.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeBrand.gradients.map(gradient => (
            <GradientChip key={gradient.token} gradient={gradient} />
          ))}
        </div>
      </section>

      {/* Semantic Tokens */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-1 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Semantic Tokens
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
          Shared across all brands. Components reference Layer 2 semantic tokens — never Layer 1 primitives.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60">
                <th className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>Semantic Token</th>
                <th className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>References Primitive</th>
                <th className="text-left px-4 py-3 text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60"
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.8rem' }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              {semanticTokens.map((token, i) => (
                <tr key={token.token} className={i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <code className="text-teal-600 dark:text-teal-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {token.token}
                    </code>
                  </td>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <code className="text-slate-600 dark:text-slate-400" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {token.references}
                    </code>
                  </td>
                  <td className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                    {token.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="mb-12">
        <h2 className="text-slate-900 dark:text-white mb-4 m-0" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem' }}>
          Usage Guidelines
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'Do', color: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20', titleColor: 'text-emerald-700 dark:text-emerald-400',
              items: ['Reference Layer 2 semantic tokens in components', 'Maintain 4.5:1 contrast ratio for text (WCAG AA)', 'Use stop 500 as the default interactive value', 'Keep Feedback colors (Positive/Warning/Negative) immutable'] },
            { title: "Don't", color: 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20', titleColor: 'text-rose-700 dark:text-rose-400',
              items: ['Put raw hex values in component code', 'Reference Layer 1 primitive tokens directly', 'Use gradients on feedback states (error/warning/success)', 'Remap Feedback colors to brand colors'] },
          ].map(guide => (
            <div key={guide.title} className={`p-5 rounded-xl border ${guide.color}`}>
              <h4 className={`mb-3 m-0 ${guide.titleColor}`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem' }}>
                {guide.title}
              </h4>
              <ul className="space-y-1.5">
                {guide.items.map(item => (
                  <li key={item} className="text-slate-600 dark:text-slate-400 flex items-start gap-2"
                      style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem' }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <PageNavigation />
    </div>
  );
}
