"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import { ReactElement, useState } from "react";

function Carrosel({
  items,
  listClass,
}: {
  listClass?: string;
  items: ReactElement[];
}) {
  const [carrosselIndex, setCarrosselIndex] = useState(0);

  const innerWidth = useWindowWidth();

  return (
    <div className="overflow-hidden w-full">
      <div
        style={{
          marginLeft:
            innerWidth < 600
              ? carrosselIndex != 0
                ? "calc(-" +
                  carrosselIndex +
                  " * (" +
                  innerWidth +
                  "px - var(--spacing) * 4))"
                : ""
              : "",
        }}
        className={`${listClass} md:grid flex mt-10 grid-cols-3 md:gap-10 w-full`}
      >
        {items.map((item, _) => item)}
      </div>
      <div className="md:hidden flex mt-20 justify-center">
        {items.map((_, i) => (
          <div
            key={i}
            onClick={() => setCarrosselIndex(i)}
            className={
              "rounded-full mr-5 border border-primary w-8 h-8 " +
              (i == carrosselIndex ? "bg-primary" : "")
            }
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carrosel;
