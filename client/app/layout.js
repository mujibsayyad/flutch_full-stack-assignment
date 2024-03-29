import { Inter } from "next/font/google";
import "./globals.css";

import LeftSideBar from "../components/HomePage/LeftSideBar";
import RightSideBar from "../components/HomePage/RightSideBar";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`w-full ${inter.className}`}>
        <AuthProvider>
          <div className="flex flex-col w-full h-full md:flex-row">
            <div className="w-full md:w-[40%]">
              <LeftSideBar />
            </div>

            <div className="w-full min-h-screen order-3 md:order-2">{children}</div>

            <div className="w-full order-2 md:w-[40%] md:max-w-[40%] md:order-2">
              <RightSideBar />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
