"use client"
import NavBar from "@/components/NavBar";
import "../styles/globals.css";

import { Open_Sans } from "next/font/google";

const opensans = Open_Sans({ subsets: ["latin"] });

import React, { useState } from "react";
import { SideDrawer } from "@/components/SideDrawer";
import Footer from "@/components/Footer";
import Providers from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  return (

    <html lang="en">
      <body className={opensans.className}>

        <main className="flex min-h-screen flex-col items-space-between justify-between background-svg">

          <Providers>
            <NavBar toggleWalletDrawer={toggleDrawer} />
            <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />

            <div>{children}</div>
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
