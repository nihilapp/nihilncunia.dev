```tsx
import { cva, type VariantProps } from "class-variance-authority";

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
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
    compoundVariants: [],
  }
);

export function ComponentExample({
  className,
  ...props
}: ComponentExampleProps) {
  return (
    <div className={cssVariants({ className })} {...props}>
      <h1>Component Example</h1>
    </div>
  );
}
```

컴포넌트는 이와 같이 작성합니다. page.tsx 는 이를 따르지 않습니다. page.tsx 는 다음과 같은 형식으로 작성합니다.

```tsx
import React from "react";
import { setMeta } from "@/_libs";

interface Props {
  children?: React.ReactNode;
}

export const metadata = setMeta({
  title: "페이지 제목", // 제목 필수
  url: "/test", // url 필수
  // description 은 필수가 아니므로 적지 않아도 됨.
});

export default function Page({ children }: Props) {
  return <div>content</div>;
}
```
