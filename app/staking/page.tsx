import React from 'react';
import Link from 'next/link';
import Banner from '@/components/Banner';

const stakingPools = [
    { id: 1, title: 'Stake Pool 1', description: 'Earn rewards by staking in Pool 1' },
    { id: 2, title: 'Stake Pool 2', description: 'Earn rewards by staking in Pool 2' },
    { id: 3, title: 'Stake Pool 3', description: 'Earn rewards by staking in Pool 3' },
];

const StakePage = () => {
    return (
        <div className="flex flex-col items-center bg-gradient-to-br p-6">
            <Banner title="Staking Pools" description="Earn rewards by staking in our staking pools" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {stakingPools.map((pool) => (
                    <div key={pool.id} className="bg-white bg-opacity-5 p-6 rounded-lg border border-white border-opacity-20 shadow-md text-center text-white">
                        <h2 className="text-2xl font-semibold mb-2">{pool.title}</h2>
                        <p className="text-gray-300 mb-4">{pool.description}</p>
                        <Link href={`/staking/${pool.id}`} className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition">
                            Stake Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StakePage;