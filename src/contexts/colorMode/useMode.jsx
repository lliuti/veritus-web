import { useContext } from "react";
import { ColorModeContext } from "./mode";

export const useMode = () => {
  const context = useContext(ColorModeContext);
  return context;
};