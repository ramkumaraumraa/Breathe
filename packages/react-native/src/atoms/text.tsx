import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../lib/utils';

/** Text classes a parent (Button, Badge, Toggle…) pushes down to its Text children. */
const TextClassContext = React.createContext<string | undefined>(undefined);

type TextProps = React.ComponentProps<typeof RNText>;

function Text({ className, ...props }: TextProps) {
  const textClass = React.useContext(TextClassContext);
  return <RNText className={cn('font-sans text-base text-foreground', textClass, className)} {...props} />;
}

export { Text, TextClassContext };
export type { TextProps };
