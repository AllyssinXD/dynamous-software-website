import { ReactNode } from "react";

function SectionSubtitle({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h3 id={id} className="block text-[1.6rem] tracking-widest font-[300]">
      {children}
    </h3>
  );
}

export default SectionSubtitle;
