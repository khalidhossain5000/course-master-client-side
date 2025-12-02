import { Montserrat, Poppins  } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/Providers/ThemeProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
   weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "CourseMaster",
  description: "Modern E-learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className={`${montserrat.variable} ${poppins.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
         <Toaster position="top-center" reverseOrder={false} />
         </ThemeProvider>
      </body>
    </html>
  );
}
