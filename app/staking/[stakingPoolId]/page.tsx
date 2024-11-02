// app/staking/[stakingPoolId]/page.tsx

interface StakingPoolProps {
    params: {
        stakingPoolId: string;
    };
}

const StakingPool = ({ params }: any) => {
    const { stakingPoolId } = params;

    return (
        <div>
            <h1>Staking Pool</h1>
            <p>Pool ID: {stakingPoolId}</p>
        </div>
    );
};

export default StakingPool;