import { ReactNode } from "react";

function SectionTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className={"block text-[2rem] my-6 font-bold"}>
      {children}
    </h2>
  );
}

export default SectionTitle;
