import * as React from "react";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ style, ratio = 1, ...props }, ref) => (
    <div ref={ref} style={{ ...style, aspectRatio: ratio }} {...props} />
  ),
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
