import { useCustomSection } from "@/hooks/useCustomSection";
import { ReactElement, ReactNode } from "react";
import SectionTitle from "../Basics/SectionTitle";
import SectionSubtitle from "../Basics/SectionSubtitle";

function DoubleContent({
  right: Right,
  left: Left,
}: {
  right: ReactElement;
  left: ReactElement;
}) {
  const section = useCustomSection();

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
