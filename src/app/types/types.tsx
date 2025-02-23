export type RewardToken = {
    rewardToken: string;
    symbol: string;
    address: string
    totalSupply: string;
    name: string;
    balance: string;
}

export type DepositToken = {
    depositToken: string;
    symbol: string;
    address: string
    contractTokenBalance: string;
    totalSupply: string;
    name: string
    balance: string
}

export type Notification = {
    poolID: string;
    user: string;
    timestamp: string;
    amount: string;
}

export type Pool = {
    amount: string;
    lockDays: string;
    rewardToken: RewardToken;
    userReward: string;
    depositToken: DepositToken;
    lastRewardAt: string;
    apy: string;
    depositedAmount: string;
}

export type PoolDetails = {
    poolInfoArray: [];
    totalDepositedAmount: string;
    depositToken: DepositToken;
    rewardToken: RewardToken;
    notifications: []
}

export type LiquidityPool = {
    pool_id: string;
    token0_symbol: string;
    token0_id: string;
    token1_symbol: string;
    token1_id: string

}