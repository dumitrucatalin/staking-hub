import Image from 'next/image';
import React from 'react';


const Footer = () => {
    return (
        <footer className="bg-black text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* <Image
                    src="/png/staking.png"
                    alt="Staking Hub"
                    width={50}
                    height={50}
                    priority
                /> */}
                <h1 className="font-cinzel text-44 font-bold leading-64 gradient-text-gray">Staking Hub</h1>
                <span className="font-opensans text-base font-normal text-left"> Staking Hub 2024 © All rights reserved</span>

                {/* <button className="bg-gradient-to-r text-white py-2 px-4 min-h-[60px] rounded" onClick={toggleComponent}>
                    {showStaking ? 'View stakes' : 'Stake'}
                </button> */}
            </div>
        </footer>
    );
};

export default Footer;
