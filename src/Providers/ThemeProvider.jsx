"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthProvider from "@/context/AuthProvider";
import TanstackProvider from "./TanstackProvider";

const ThemeProvider = ({ children, ...props }) => {
  return (
    <NextThemesProvider {...props}>
      <TanstackProvider>
        <AuthProvider>{children}</AuthProvider>
      </TanstackProvider>
    </NextThemesProvider>
  );
};

export default ThemeProvider;
