const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts from:", deployer.address);

    // Deploy DelegatorStaking
    const DelegatorStaking = await hre.ethers.getContractFactory("DelegatorStaking");
    const delegatorStaking = await DelegatorStaking.deploy();
    console.log("DelegatorStaking deployed to:", delegatorStaking.address);

    // Deploy DelegatorGovernance
    const DelegatorGovernance = await hre.ethers.getContractFactory("DelegatorGovernance");
    const delegatorGovernance = await DelegatorGovernance.deploy();
    console.log("DelegatorGovernance deployed to:", delegatorGovernance.address);

    // Deploy DelegatorRewardDistribution
    const DelegatorRewardDistribution = await hre.ethers.getContractFactory("DelegatorRewardDistribution");
    const delegatorRewardDistribution = await DelegatorRewardDistribution.deploy();
    console.log("DelegatorRewardDistribution deployed to:", delegatorRewardDistribution.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
