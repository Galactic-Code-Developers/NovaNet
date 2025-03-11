// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract QuantumLedgerSync {
    struct ValidatorState {
        address validator;
        uint256 stake;
        uint256 lastUpdated;
        bool isActive;
    }

    mapping(address => ValidatorState) public validatorStates;
    address[] public activeValidators;

    event ValidatorStateUpdated(address indexed validator, uint256 stake, uint256 timestamp);
    event ValidatorRemoved(address indexed validator);

    function updateValidatorState(uint256 _stake) external {
        validatorStates[msg.sender] = ValidatorState({
            validator: msg.sender,
            stake: _stake,
            lastUpdated: block.timestamp,
            isActive: true
        });

        activeValidators.push(msg.sender);
        emit ValidatorStateUpdated(msg.sender, _stake, block.timestamp);
    }

    function removeValidator(address _validator) external {
        require(validatorStates[_validator].isActive, "Validator not active");

        validatorStates[_validator].isActive = false;
        emit ValidatorRemoved(_validator);
    }

    function getActiveValidators() external view returns (address[] memory) {
        return activeValidators;
    }
}
