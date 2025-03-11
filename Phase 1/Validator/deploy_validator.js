const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts from:", deployer.address);

    const ValidatorConsensus = await hre.ethers.getContractFactory("ValidatorConsensus");
    const validatorConsensus = await ValidatorConsensus.deploy();
    await validatorConsensus.deployed();
    console.log("ValidatorConsensus deployed to:", validatorConsensus.address);

    const ValidatorPerformanceMetrics = await hre.ethers.getContractFactory("ValidatorPerformanceMetrics");
    const validatorPerformanceMetrics = await ValidatorPerformanceMetrics.deploy();
    await validatorPerformanceMetrics.deployed();
    console.log("ValidatorPerformanceMetrics deployed to:", validatorPerformanceMetrics.address);

    const ValidatorPenaltyEnforcement = await hre.ethers.getContractFactory("ValidatorPenaltyEnforcement");
    const validatorPenaltyEnforcement = await ValidatorPenaltyEnforcement.deploy();
    await validatorPenaltyEnforcement.deployed();
    console.log("ValidatorPenaltyEnforcement deployed to:", validatorPenaltyEnforcement.address);

    const contractAddresses = {
        ValidatorConsensus: validatorConsensus.address,
        ValidatorPerformanceMetrics: validatorPerformanceMetrics.address,
        ValidatorPenaltyEnforcement: validatorPenaltyEnforcement.address,
    };

    fs.writeFileSync("deployed_contracts_validator.json", JSON.stringify(contractAddresses, null, 2));

    console.log("Contract addresses saved to deployed_contracts_validator.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
