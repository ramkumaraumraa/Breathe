import * as React from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../lib/utils';

/** Text classes a parent (Button, Badge, Toggle…) pushes down to its Text children. */
const TextClassContext = React.createContext<string | undefined>(undefined);

/** Internal: a root Text marks its subtree so nested Texts inherit (like web spans) instead of re-applying body defaults. */
const InsideTextContext = React.createContext(false);

type TextProps = React.ComponentProps<typeof RNText> & React.RefAttributes<RNText>;

function Text({ className, ...props }: TextProps) {
  const textClass = React.useContext(TextClassContext);
  // ponytail: a View inside a Text (e.g. an inline Badge) still counts as nested; reset the context there if that ever ships
  if (React.useContext(InsideTextContext)) return <RNText className={className} {...props} />;
  return (
    <InsideTextContext.Provider value>
      <RNText className={cn('font-sans text-base text-foreground', textClass, className)} {...props} />
    </InsideTextContext.Provider>
  );
}

const isTextChild = (c: React.ReactNode): c is string | number => typeof c === 'string' || typeof c === 'number';

/** Wraps bare strings/numbers so they can sit inside a View: all-text children become one <Text>; mixed children get each text run wrapped. */
function wrapTextChildren(children: React.ReactNode, textProps?: TextProps): React.ReactNode {
  const parts = React.Children.toArray(children);
  if (parts.length === 0) return children;
  if (parts.every(isTextChild)) return <Text {...textProps}>{children}</Text>;
  return parts.map((c, i) => (isTextChild(c) ? <Text key={i} {...textProps}>{c}</Text> : c));
}

export { Text, TextClassContext, wrapTextChildren };
export type { TextProps };
