const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts from:", deployer.address);

    const DelegatorStaking = await hre.ethers.getContractFactory("DelegatorStaking");
    const delegatorStaking = await DelegatorStaking.deploy();
    await delegatorStaking.deployed();
    console.log("DelegatorStaking deployed to:", delegatorStaking.address);

    const DelegatorGovernance = await hre.ethers.getContractFactory("DelegatorGovernance");
    const delegatorGovernance = await DelegatorGovernance.deploy();
    await delegatorGovernance.deployed();
    console.log("DelegatorGovernance deployed to:", delegatorGovernance.address);

    const DelegatorRewardDistribution = await hre.ethers.getContractFactory("DelegatorRewardDistribution");
    const delegatorRewardDistribution = await DelegatorRewardDistribution.deploy();
    await delegatorRewardDistribution.deployed();
    console.log("DelegatorRewardDistribution deployed to:", delegatorRewardDistribution.address);

    const contractAddresses = {
        DelegatorStaking: delegatorStaking.address,
        DelegatorGovernance: delegatorGovernance.address,
        DelegatorRewardDistribution: delegatorRewardDistribution.address,
    };

    fs.writeFileSync("deployed_contracts_delegator.json", JSON.stringify(contractAddresses, null, 2));

    console.log("Contract addresses saved to deployed_contracts_delegator.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
