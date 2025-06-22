import { ReactElement, ReactNode, useId } from "react";
import SectionTitle from "./SectionTitle";
import SectionSubtitle from "./SectionSubtitle";

function SectionRoot({
  title,
  subtitle,
  children,
  containerClass,
  className,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  containerClass?: string;
  className?: string;
}): {
  element: ReactElement;
  getIDS: () => { subtitle: string; title: string };
} {
  const baseID = useId(); // <- apenas uma chamada aqui
  const titleID = `${baseID}-title`;
  const subtitleID = `${baseID}-subtitle`;

  return {
    element: (
      <section
        className={className + " bg-background min-h-96"}
        aria-labelledby={titleID}
      >
        <div
          className={`container px-2 md:px-0 pt-20 mb-20 ${containerClass} mx-auto`}
        >
          {subtitle && (
            <SectionSubtitle id={subtitleID}>{subtitle}</SectionSubtitle>
          )}
          {title && <SectionTitle id={titleID}>{title}</SectionTitle>}
          {children}
        </div>
      </section>
    ),
    getIDS() {
      return { title: titleID, subtitle: subtitleID };
    },
  };
}

export default SectionRoot;
