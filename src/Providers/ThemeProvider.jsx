

// import React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import AuthProvider from "@/context/AuthProvider";



// export function ThemeProvider(props) {
//   return (
//     <NextThemesProvider {...props}>
//       {/* <TanstackProvider></TanstackProvider> */}
//       <AuthProvider>
//         {props.children}
//       </AuthProvider>
//     </NextThemesProvider>
//   );
// }






"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthProvider from "@/context/AuthProvider";

const ThemeProvider = ({ children, ...props }) => {
  return (
    <NextThemesProvider {...props}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NextThemesProvider>
  );
};

export default ThemeProvider;







