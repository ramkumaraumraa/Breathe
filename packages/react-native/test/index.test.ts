jest.mock('@react-native-community/slider', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: (props: object) => mockReact.createElement(View, { testID: 'native-slider', ...props }),
  };
});

jest.mock('react-native-screens', () => {
  const mockReact = require('react');
  return { FullWindowOverlay: ({ children }: { children: unknown }) => mockReact.createElement(mockReact.Fragment, null, children) };
});

import * as pkg from '../src';

// Tasks 18–27 add: Textarea, Checkbox, RadioGroup(+Item), Switch, Toggle(+variants), ToggleGroup(+Item),
// Slider, Select*, InputOTP*, Calendar. (Slider and Select will need jest.mock for
// @react-native-community/slider and react-native-screens here.)
const EXPECTED = [
  'cn', 'THEME', 'useThemeColors', 'useFocusRing',
  'Text', 'TextClassContext', 'wrapTextChildren', 'Icon', 'IconSizeContext', 'Gradient', 'BRAND_GRADIENT', 'Spinner',
  'Button', 'buttonVariants', 'buttonTextVariants',
  'Label', 'Badge', 'badgeVariants', 'badgeTextVariants', 'Separator', 'Skeleton',
  'Progress', 'clampProgress', 'Avatar', 'AvatarImage', 'AvatarFallback',
  'Input',
  'Textarea',
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
