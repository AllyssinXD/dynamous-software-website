import SectionSubtitle from "@/components/Basics/SectionSubtitle";
import SectionTitle from "@/components/Basics/SectionTitle";
import { ReactElement, ReactNode, useId } from "react";

export function useCustomSection() {
  const baseID = useId();
  const titleID = `${baseID}-title`;
  const subtitleID = `${baseID}-subtitle`;

  function createSectionRoot({
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
  }): ReactElement {
    return (
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
    );
  }

  return {
    titleID,
    subtitleID,
    createSectionRoot,
  };
}
