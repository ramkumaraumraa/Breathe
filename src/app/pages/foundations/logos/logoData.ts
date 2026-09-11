export type LogoStatus = 'confirmed' | 'pending';

export interface LogoVariant {
  id: string;
  name: string;
  usageNote: string;
  previewBg: string;
  previewBgDark?: string;
  files: {
    svg?: string;
    png1x?: string;
    png2x?: string;
    png3x?: string;
  };
}

export interface BrandLogoConfig {
  id: string;
  label: string;
  tagline: string;
  platform: string;
  status: LogoStatus;
  accentColor: string;
  variants?: LogoVariant[];
}

// Canonical brand order — used across Logos, Colors, and Typography pages
export const BRAND_ORDER = [
  'aumraa',
  'technocracy',
  'leminiscate',
  'maligai-manager',
  'ullagellam',
  'yakaizen',
] as const;

export const brands: BrandLogoConfig[] = [
  {
    id: 'aumraa',
    label: 'Aumraa',
    tagline: 'Design studio & product brand',
    platform: 'Web · Marketing',
    status: 'confirmed',
    accentColor: '#2F9E44',
    variants: [
      {
        id: 'standard',
        name: 'Standard',
        usageNote: 'Default use — light surfaces, documents, web',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/aumraa/aumraa_standard_light.svg',
        },
      },
      {
        id: 'reversed',
        name: 'Reversed',
        usageNote: 'Dark backgrounds, hero sections, splash screens',
        previewBg: '#2F9E44',
        previewBgDark: '#1B6028',
        files: {
          svg: '/assets/logos/aumraa/aumraa_reversed_dark.svg',
        },
      },
      {
        id: 'mono-black',
        name: 'Mono — Black',
        usageNote: 'Single-colour print, B&W contexts, emboss/deboss',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/aumraa/aumraa_mono-black.svg',
        },
      },
      {
        id: 'mono-white',
        name: 'Mono — White',
        usageNote: 'Single-colour on dark, merchandise, cut vinyl',
        previewBg: '#E3E4E4',
        files: {
          svg: '/assets/logos/aumraa/aumraa_mono-white.svg',
        },
      },
      {
        id: 'horizontal',
        name: 'Horizontal lockup',
        usageNote: 'Wide/landscape layouts — nav bars, headers, email footers',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/aumraa/aumraa_horizontal_light.svg',
        },
      },
      {
        id: 'stacked',
        name: 'Stacked / Vertical',
        usageNote: 'Square/portrait layouts — app stores, social profiles, print collateral',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/aumraa/aumraa_stacked_light.svg',
        },
      },
      {
        id: 'icon',
        name: 'Icon / Mark only',
        usageNote: 'Favicons, app icons, small-scale usage, watermarks',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/aumraa/aumraa_icon.svg',
        },
      },
      {
        id: 'alpha',
        name: 'Alpha / Transparent',
        usageNote: 'Overlays, video, any background where the surface colour is unknown',
        previewBg: 'checkerboard',
        files: {
          svg: '/assets/logos/aumraa/aumraa_alpha.svg',
        },
      },
    ],
  },
  {
    id: 'technocracy',
    label: 'Technocracy',
    tagline: 'Admin dashboard & analytics',
    platform: 'Web',
    status: 'pending',
    accentColor: '#8B5CF6',
  },
  {
    id: 'leminiscate',
    label: 'Leminiscate',
    tagline: 'Real estate intelligence',
    platform: 'Web · Mobile',
    status: 'confirmed',
    accentColor: '#1C60C1',
    variants: [
      {
        id: 'standard',
        name: 'Standard',
        usageNote: 'Default use — light surfaces, documents, web',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/leminiscate/leminiscate_standard_light.svg',
        },
      },
      {
        id: 'reversed',
        name: 'Reversed',
        usageNote: 'Dark backgrounds, hero sections, splash screens',
        previewBg: '#1C60C1',
        previewBgDark: '#0F3A7A',
        files: {
          svg: '/assets/logos/leminiscate/leminiscate_reversed_dark.svg',
        },
      },
      {
        id: 'mono-black',
        name: 'Mono — Black',
        usageNote: 'Single-colour print, B&W contexts, emboss/deboss',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/leminiscate/leminiscate_mono-black.svg',
        },
      },
      {
        id: 'mono-white',
        name: 'Mono — White',
        usageNote: 'Single-colour on dark, merchandise, cut vinyl',
        previewBg: '#E3E4E4',
        files: {
          svg: '/assets/logos/leminiscate/leminiscate_mono-white.svg',
        },
      },
      {
        id: 'horizontal',
        name: 'Horizontal lockup',
        usageNote: 'Wide/landscape layouts — nav bars, headers, email footers',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/leminiscate/leminiscate_horizontal_light.svg',
        },
      },
      {
        id: 'stacked',
        name: 'Stacked / Vertical',
        usageNote: 'Square/portrait layouts — app stores, social profiles, print collateral',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/leminiscate/leminiscate_stacked_light.svg',
        },
      },
      {
        id: 'icon',
        name: 'Icon / Mark only',
        usageNote: 'Favicons, app icons, small-scale usage, watermarks',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/leminiscate/leminiscate_icon.svg',
        },
      },
      {
        id: 'alpha',
        name: 'Alpha / Transparent',
        usageNote: 'Overlays, video, any background where the surface colour is unknown',
        previewBg: 'checkerboard',
        files: {
          svg: '/assets/logos/leminiscate/leminiscate_alpha.svg',
        },
      },
    ],
  },
  {
    id: 'kaayo',
    label: 'Kaayo',
    tagline: 'Tutor & class operations · Mobile · Tablet',
    platform: 'Mobile · Tablet',
    status: 'confirmed',
    accentColor: '#970103',
    variants: [
      {
        id: 'standard',
        name: 'Standard',
        usageNote: 'Default use — light surfaces, documents, web',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/kaayo/Horizontal.svg',
        },
      },
      {
        id: 'reversed',
        name: 'Reversed',
        usageNote: 'Dark backgrounds, hero sections, splash screens',
        previewBg: '#970103',
        previewBgDark: '#600102',
        files: {
          svg: '/assets/logos/kaayo/Horizontal_filled.svg',
        },
      },
      {
        id: 'mono-black',
        name: 'Mono — Black',
        usageNote: 'Single-colour print, B&W contexts, emboss/deboss',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/kaayo/Horizontal_black.svg',
        },
      },
      {
        id: 'mono-white',
        name: 'Mono — White',
        usageNote: 'Single-colour on dark, merchandise, cut vinyl',
        previewBg: '#1E293B',
        files: {
          svg: '/assets/logos/kaayo/Horizontal_white.svg',
        },
      },
      {
        id: 'horizontal',
        name: 'Horizontal lockup',
        usageNote: 'Wide/landscape layouts — nav bars, headers, email footers',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/kaayo/Horizontal.svg',
        },
      },
      {
        id: 'stacked',
        name: 'Stacked / Vertical',
        usageNote: 'Square/portrait layouts — app stores, social profiles, print collateral',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/kaayo/Vertical.svg',
        },
      },
      {
        id: 'icon',
        name: 'Icon / Mark only',
        usageNote: 'Favicons, app icons, small-scale usage, watermarks',
        previewBg: '#FFFFFF',
        files: {
          svg: '/assets/logos/kaayo/symbol.svg',
        },
      },
      {
        id: 'alpha',
        name: 'Alpha / Transparent',
        usageNote: 'Overlays, video, any background where the surface colour is unknown',
        previewBg: 'checkerboard',
        files: {
          svg: '/assets/logos/kaayo/Horizontal.svg',
        },
      },
    ],
  },
  {
    id: 'maligai-manager',
    label: 'Maligai Manager',
    tagline: 'Grocery & inventory management',
    platform: 'Mobile',
    status: 'pending',
    accentColor: '#D97706',
  },
  {
    id: 'ullagellam',
    label: 'Ullagellam',
    tagline: 'Explore & discover around you',
    platform: 'Mobile',
    status: 'pending',
    accentColor: '#7C3AED',
  },
  {
    id: 'ilakh',
    label: 'Ilakh',
    tagline: 'Goal tracking & personal finance',
    platform: 'Web · Mobile',
    status: 'pending',
    accentColor: '#0369A1',
  },
  {
    id: 'yakaizen',
    label: 'Yakaizen',
    tagline: 'Habit & continuous improvement',
    platform: 'Mobile · Smartwatch',
    status: 'pending',
    accentColor: '#334155',
  },
];
