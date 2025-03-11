const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts from:", deployer.address);

    const NovaNetCore = await hre.ethers.getContractFactory("NovaNetCore");
    const novaNetCore = await NovaNetCore.deploy();
    await novaNetCore.deployed();
    console.log("NovaNetCore deployed to:", novaNetCore.address);

    const NovaNetBridge = await hre.ethers.getContractFactory("NovaNetBridge");
    const novaNetBridge = await NovaNetBridge.deploy();
    await novaNetBridge.deployed();
    console.log("NovaNetBridge deployed to:", novaNetBridge.address);

    const QuantumLedgerSync = await hre.ethers.getContractFactory("QuantumLedgerSync");
    const quantumLedgerSync = await QuantumLedgerSync.deploy();
    await quantumLedgerSync.deployed();
    console.log("QuantumLedgerSync deployed to:", quantumLedgerSync.address);

    // Store contract addresses in a file
    const contractAddresses = {
        NovaNetCore: novaNetCore.address,
        NovaNetBridge: novaNetBridge.address,
        QuantumLedgerSync: quantumLedgerSync.address,
    };

    fs.writeFileSync("deployed_contracts_core.json", JSON.stringify(contractAddresses, null, 2));

    console.log("Contract addresses saved to deployed_contracts_core.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
