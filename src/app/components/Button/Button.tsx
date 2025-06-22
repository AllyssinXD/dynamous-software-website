import { ReactNode } from "react";

export interface Props {
  label: string;
  className: string;
  icon?: {
    className: string;
    element: ReactNode;
  };
  isSecondary?: boolean;
}

function Button({ className, label, icon, isSecondary }: Props) {
  return (
    <button
      className={`${className} ${
        !isSecondary
          ? "bg-primary text-white border-2 border-primary p-2 px-10 rounded-[30px] hover:bg-foreground hover:text-background hover:border-foreground transition hover:cursor-pointer"
          : "border-primary border-2 text-forecolor p-2 px-10 rounded-[30px] hover:bg-foreground hover:text-background hover:border-foreground hover:cursor-pointer transition"
      } flex justify-center items-center text-center font-bold`}
    >
      <span>{label}</span>
    </button>
  );
}

export default Button;
