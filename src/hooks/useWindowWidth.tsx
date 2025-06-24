import { useEffect, useLayoutEffect, useState } from "react";

function useWindowWidth() {
  const [innerWidth, setInnerWidth] = useState(1336);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return innerWidth;
}

export default useWindowWidth;
