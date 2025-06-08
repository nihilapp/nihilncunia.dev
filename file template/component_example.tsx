import { cva, type VariantProps } from 'class-variance-authority';

interface ComponentExampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    ``, // 공통적 스타일을 여기에.
  ],
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
    compoundVariants: [],
  }
);

export function ComponentExample({
  className,
  ...props
}: ComponentExampleProps) {
  return (
    <div className={cssVariants({ className, })} {...props}>
      <h1>Component Example</h1>
    </div>
  );
}
