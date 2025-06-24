import Image from "next/image";
import { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
  label: string;
  className: string;
  icon?: {
    element: ReactNode;
  };
  isSecondary?: boolean;
  vanilla?: boolean;
  onClick?: () => void;
}

function Button({
  children,
  className,
  label,
  icon,
  isSecondary,
  vanilla,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        !isSecondary
          ? "bg-primary text-white border-2 border-primary p-2 px-10 rounded-[30px] hover:bg-foreground hover:text-background hover:border-foreground transition hover:cursor-pointer"
          : "border-primary border-2 text-forecolor p-2 px-10 rounded-[30px] hover:bg-foreground hover:text-background hover:border-foreground hover:cursor-pointer transition"
      } ${
        !vanilla ? "flex justify-center items-center text-center font-bold" : ""
      }`}
    >
      {icon && icon.element}
      {children}
      <span>{label}</span>
    </button>
  );
}

export default Button;
