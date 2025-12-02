

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";



export function ThemeProvider(props) {
  return (
    <NextThemesProvider {...props}>
      {/* <TanstackProvider></TanstackProvider> */}
        {props.children}
      
    </NextThemesProvider>
  );
}