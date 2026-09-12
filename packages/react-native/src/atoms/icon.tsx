import type { LucideProps } from 'lucide-react-native';
import { styled } from 'nativewind';
import type { StyledConfiguration } from 'react-native-css';
import * as React from 'react';
import { cn } from '../lib/utils';
import { TextClassContext } from './text';

type IconComponent = React.ComponentType<LucideProps>;

/** Icon size (px) a parent pushes down; replaces web `[&_svg]:size-N`. Web default svg size is 16. */
const IconSizeContext = React.createContext<number>(16);

type IconProps = LucideProps & { as: IconComponent; className?: string };

function IconImpl({ as: Component, ...props }: IconProps) {
  return <Component {...props} />;
}

// className size classes (size-6, h-4 w-6) map to lucide's width/height props, which lucide prefers over `size`.
// Precedence: className size > explicit `size` prop > IconSizeContext (web: CSS beats the svg width attribute).
const mapping: StyledConfiguration<typeof IconImpl, 'className'> = {
  className: { target: 'style', nativeStyleMapping: { height: 'height', width: 'width' } },
};
const StyledIcon = styled(IconImpl, mapping);

function Icon({ as, className, size, ...props }: IconProps) {
  const textClass = React.useContext(TextClassContext);
  const inheritedSize = React.useContext(IconSizeContext);
  return (
    <StyledIcon
      as={as}
      className={cn('text-foreground', textClass, className)}
      size={size ?? inheritedSize}
      {...props}
    />
  );
}

export { Icon, IconSizeContext };
export type { IconComponent, IconProps };
