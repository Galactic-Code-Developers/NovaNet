// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ValidatorConsensus {
    struct Validator {
        address validatorAddress;
        uint256 stakedAmount;
        uint256 reputationScore;
        bool isActive;
    }

    mapping(address => Validator) public validators;
    address[] public activeValidators;

    event ValidatorRegistered(address indexed validator, uint256 stakedAmount);
    event ValidatorRemoved(address indexed validator);

    function registerValidator(uint256 _stakeAmount) external {
        require(_stakeAmount >= 1000 * 10**18, "Stake below minimum");

        validators[msg.sender] = Validator({
            validatorAddress: msg.sender,
            stakedAmount: _stakeAmount,
            reputationScore: 100,
            isActive: true
        });

        activeValidators.push(msg.sender);
        emit ValidatorRegistered(msg.sender, _stakeAmount);
    }
}
