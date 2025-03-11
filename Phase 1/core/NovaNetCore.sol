// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title NovaNet Core Contract
 * @dev Implements Layer-1 consensus, chain state management, and execution on NVIDIA Orin nodes.
 */
contract NovaNetCore {
    struct BlockData {
        uint256 blockNumber;
        bytes32 blockHash;
        uint256 timestamp;
    }

    mapping(uint256 => BlockData) public blockchain;
    uint256 public latestBlockNumber;

    event BlockFinalized(uint256 indexed blockNumber, bytes32 blockHash);

    /**
     * @dev Finalizes a new block in the NovaNet blockchain.
     * @param _blockHash The cryptographic hash of the finalized block.
     */
    function finalizeBlock(bytes32 _blockHash) external {
        latestBlockNumber++;
        blockchain[latestBlockNumber] = BlockData({
            blockNumber: latestBlockNumber,
            blockHash: _blockHash,
            timestamp: block.timestamp
        });

        emit BlockFinalized(latestBlockNumber, _blockHash);
    }

    /**
     * @dev Retrieves block data by block number.
     * @param _blockNumber The block number to query.
     * @return BlockData The details of the requested block.
     */
    function getBlockData(uint256 _blockNumber) external view returns (BlockData memory) {
        return blockchain[_blockNumber];
    }
}
