// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DelegatorStaking {
    struct Stake {
        address delegator;
        address validator;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => mapping(address => Stake)) public delegatorStakes;
    mapping(address => uint256) public totalStakedToValidator;

    event StakeDeposited(address indexed delegator, address indexed validator, uint256 amount);
    event StakeWithdrawn(address indexed delegator, address indexed validator, uint256 amount);

    function depositStake(address _validator, uint256 _amount) external {
        require(_amount >= 500 * 10**18, "Stake below minimum requirement");

        delegatorStakes[msg.sender][_validator] = Stake({
            delegator: msg.sender,
            validator: _validator,
            amount: _amount,
            timestamp: block.timestamp
        });

        totalStakedToValidator[_validator] += _amount;
        emit StakeDeposited(msg.sender, _validator, _amount);
    }

    function withdrawStake(address _validator) external {
        uint256 stakeAmount = delegatorStakes[msg.sender][_validator].amount;
        require(stakeAmount > 0, "No active stake");

        totalStakedToValidator[_validator] -= stakeAmount;
        delete delegatorStakes[msg.sender][_validator];

        emit StakeWithdrawn(msg.sender, _validator, stakeAmount);
    }
}
