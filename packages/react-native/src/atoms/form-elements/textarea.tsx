import * as React from 'react';
import { TextInput } from 'react-native';
import { useFocusRing } from '../../lib/use-focus-ring';
import { useThemeColors } from '../../lib/theme';
import { cn } from '../../lib/utils';

type TextareaProps = React.ComponentProps<typeof TextInput> & React.RefAttributes<TextInput> & { disabled?: boolean };

function Textarea({ className, disabled, editable, onFocus, onBlur, style, ...props }: TextareaProps) {
  const colors = useThemeColors();
  const ring = useFocusRing(onFocus, onBlur);
  const isEditable = !disabled && editable !== false;

  return (
    <TextInput
      multiline
      textAlignVertical="top"
      className={cn(
        'min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 font-sans text-sm text-foreground',
        !isEditable && 'opacity-50',
        className,
      )}
      editable={isEditable}
      placeholderTextColor={colors.mutedForeground}
      onFocus={ring.onFocus}
      onBlur={ring.onBlur}
      style={[ring.ringStyle, style]}
      {...props}
    />
  );
}

export { Textarea };
export type { TextareaProps };
