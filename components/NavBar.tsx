"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${className}`}
  >
    {children}
  </button>
);

interface NavBarProps {
  toggleWalletDrawer: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleWalletDrawer }) => {
  return (
    <nav className="container mx-auto flex justify-between items-center p-4">
      <Link href="/" passHref >
        {/* <Image
          src="/png/staking.png"
          alt="Staking Hub"
          width={50}
          height={50}
          priority
        /> */}
        <h1 className="font-cinzel text-44 font-bold leading-64 gradient-text-gray">Staking Hub</h1>
      </Link>

      <div className="flex gap-4 px-6"
      >
        <p className="text-white font-opensans text-base">Wallet</p>
        <button onClick={toggleWalletDrawer}>
          <Image
            src="/wallet.svg"
            alt="wallet"
            width={23.33}
            height={21}
            priority
          />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
