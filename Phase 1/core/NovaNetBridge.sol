// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NovaNetBridge {
    struct CrossChainTransfer {
        address sender;
        address receiver;
        uint256 amount;
        string targetChain;
        bool completed;
    }

    mapping(uint256 => CrossChainTransfer) public crossChainTransfers;
    uint256 public transferCounter;

    event CrossChainTransferInitiated(uint256 indexed transferId, address indexed sender, address indexed receiver, uint256 amount, string targetChain);
    event CrossChainTransferCompleted(uint256 indexed transferId);

    function initiateCrossChainTransfer(address _receiver, uint256 _amount, string memory _targetChain) external {
        transferCounter++;

        crossChainTransfers[transferCounter] = CrossChainTransfer({
            sender: msg.sender,
            receiver: _receiver,
            amount: _amount,
            targetChain: _targetChain,
            completed: false
        });

        emit CrossChainTransferInitiated(transferCounter, msg.sender, _receiver, _amount, _targetChain);
    }

    function completeCrossChainTransfer(uint256 _transferId) external {
        require(!crossChainTransfers[_transferId].completed, "Transfer already completed");

        crossChainTransfers[_transferId].completed = true;
        emit CrossChainTransferCompleted(_transferId);
    }
}
