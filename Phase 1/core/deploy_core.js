const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts from:", deployer.address);

    // Deploy NovaNetCore
    const NovaNetCore = await hre.ethers.getContractFactory("NovaNetCore");
    const novaNetCore = await NovaNetCore.deploy();
    console.log("NovaNetCore deployed to:", novaNetCore.address);

    // Deploy NovaNetBridge
    const NovaNetBridge = await hre.ethers.getContractFactory("NovaNetBridge");
    const novaNetBridge = await NovaNetBridge.deploy();
    console.log("NovaNetBridge deployed to:", novaNetBridge.address);

    // Deploy QuantumLedgerSync
    const QuantumLedgerSync = await hre.ethers.getContractFactory("QuantumLedgerSync");
    const quantumLedgerSync = await QuantumLedgerSync.deploy();
    console.log("QuantumLedgerSync deployed to:", quantumLedgerSync.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
