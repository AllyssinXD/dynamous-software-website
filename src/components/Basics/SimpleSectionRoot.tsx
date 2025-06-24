import { ReactNode } from "react";
import SectionRoot from "./Section";

export default function SimpleSectionRoot({
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
}) {
  return SectionRoot({ title, subtitle, children, containerClass, className });
}
