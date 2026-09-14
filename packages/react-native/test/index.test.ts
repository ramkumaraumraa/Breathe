jest.mock('@react-native-community/slider', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: object) => mockReact.createElement(View, { testID: 'native-slider', ...props }),
  };
});

import * as pkg from '../src';

const EXPECTED = [
  'cn', 'THEME', 'useThemeColors', 'useFocusRing',
  'Text', 'TextClassContext', 'wrapTextChildren', 'Icon', 'IconSizeContext', 'Gradient', 'BRAND_GRADIENT', 'Spinner', 'Loader', 'KaayoLoader', 'KayoBrutalistLoader',
  'Button', 'buttonVariants', 'buttonTextVariants',
  'Label', 'Badge', 'badgeVariants', 'badgeTextVariants', 'Separator', 'Skeleton',
  'Progress', 'clampProgress', 'Avatar', 'AvatarImage', 'AvatarFallback',
  'Input',
  'Textarea',
  'Checkbox',
  'RadioGroup', 'RadioGroupItem',
  'Switch',
  'Toggle', 'toggleTextClass', 'toggleVariants',
  'ToggleGroup', 'ToggleGroupItem',
  'Slider',
  'Select', 'SelectContent', 'SelectGroup', 'SelectItem', 'SelectLabel', 'SelectSeparator', 'SelectTrigger', 'SelectValue',
  'InputOTP', 'InputOTPGroup', 'InputOTPSeparator', 'InputOTPSlot',
  'Calendar',
];

describe('@aumraa/breathe-native public API', () => {
  it('exports exactly the expected names', () => {
    expect(Object.keys(pkg).sort()).toEqual([...EXPECTED].sort());
  });
});
