import { ReactElement, ReactNode } from "react";

function DoubleContent({
  right: Right,
  left: Left,
}: {
  right: ReactElement;
  left: ReactElement;
}) {
  return (
    <div className="md:grid md:grid-cols-2 justify-between">
      <ContentSide>{Left}</ContentSide>
      <ContentSide>{Right}</ContentSide>
    </div>
  );
}

function ContentSide({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default DoubleContent;
