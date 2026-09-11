import type { LucideProps } from 'lucide-react-native';
import { styled } from 'nativewind';
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

// `size-4` / `h-4 w-4` classes feed lucide's numeric `size` prop.
// Deviation (typecheck): react-native-css 3.0.7's `StyledConfigurationObject` computes
// `nativeStyleToProp`'s type via `ResolveDotPath<T, ComponentProps<C>>` — that generic's own
// declaration is `ResolveDotPath<T, Path extends string>` (object, then dot-path string), so the
// library's own usage passes the arguments in the wrong order for `target: 'style'`, resolving to
// `never` and typing the field as exactly `undefined`. `target: 'style'` alone typechecks; only the
// value below needs the cast. Runtime shape is unchanged (still the documented v5 API).
const StyledIcon = styled(IconImpl, {
  className: {
    target: 'style',
    nativeStyleToProp: { height: 'size', width: 'size' } as any,
  },
});

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
