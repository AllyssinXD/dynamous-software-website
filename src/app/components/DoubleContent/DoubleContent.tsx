import { ElementType, ReactElement, ReactNode } from "react";
import BasicSection from "../Basics/Section";
import { Basics } from "../Basics";

function DoubleContent({
  right: Right,
  left: Left,
}: {
  right: ReactElement;
  left: ReactElement;
}) {
  // Content precisa dos ids
  let sectionIDs: { title: string; subtitle: string };

  const Content = () => (
    <div className="md:grid md:grid-cols-2 justify-between">
      <ContentSide>
        <Basics.SectionSubtitle id={sectionIDs.subtitle}>
          FAQ
        </Basics.SectionSubtitle>
        <Basics.SectionTitle id={sectionIDs.title}>
          Perguntas mais frequentes sobre Software
        </Basics.SectionTitle>
        {Left}
      </ContentSide>
      <ContentSide>{Right}</ContentSide>
    </div>
  );

  const ComplexSection = Basics.SectionRoot({ children: <Content /> });
  sectionIDs = ComplexSection.getIDS();
  // Program Content Here

  return ComplexSection.element;
}

function ContentSide({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default DoubleContent;
