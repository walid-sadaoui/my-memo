import React from "react";

export enum widthBreakpoints {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState<string>(() =>
    window.innerWidth < 640 ? widthBreakpoints.SMALL : widthBreakpoints.MEDIUM
  );

  const setWidthSize = () => {
    if (window.innerWidth < 640) {
      setWindowSize(widthBreakpoints.SMALL);
    } else {
      setWindowSize(widthBreakpoints.MEDIUM);
    }
  };

  React.useEffect(() => {
    const handleWindowResize = () => setWidthSize();
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
