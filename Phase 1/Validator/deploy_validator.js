const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts from:", deployer.address);

    // Deploy ValidatorConsensus
    const ValidatorConsensus = await hre.ethers.getContractFactory("ValidatorConsensus");
    const validatorConsensus = await ValidatorConsensus.deploy();
    console.log("ValidatorConsensus deployed to:", validatorConsensus.address);

    // Deploy ValidatorPerformanceMetrics
    const ValidatorPerformanceMetrics = await hre.ethers.getContractFactory("ValidatorPerformanceMetrics");
    const validatorPerformanceMetrics = await ValidatorPerformanceMetrics.deploy();
    console.log("ValidatorPerformanceMetrics deployed to:", validatorPerformanceMetrics.address);

    // Deploy ValidatorPenaltyEnforcement
    const ValidatorPenaltyEnforcement = await hre.ethers.getContractFactory("ValidatorPenaltyEnforcement");
    const validatorPenaltyEnforcement = await ValidatorPenaltyEnforcement.deploy();
    console.log("ValidatorPenaltyEnforcement deployed to:", validatorPenaltyEnforcement.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
