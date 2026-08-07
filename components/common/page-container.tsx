import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return <div className="mx-auto w-full max-w-7xl space-y-6">{children}</div>;
}
