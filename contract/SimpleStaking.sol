// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract SimpleStaking {
    address public owner;
    uint256 public constant STAKING_RATE = 5; // 5% annual return
    
    struct StakeInfo {
        uint256 stakedAmount;
        uint256 lastUpdateTime;
    }
    
    mapping(address => StakeInfo) public stakes;
    bool private locked;
    
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 reward);
    
    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    // Users can stake ETH by sending it to the contract
    function stake() external payable noReentrant {
        require(msg.value > 0, "Cannot stake 0");
        
        _updateRewards(msg.sender);
        
        stakes[msg.sender].stakedAmount += msg.value;
        stakes[msg.sender].lastUpdateTime = block.timestamp;
        
        emit Staked(msg.sender, msg.value);
    }
    
    function withdraw(uint256 _amount) external noReentrant {
        require(_amount > 0, "Cannot withdraw 0");
        require(stakes[msg.sender].stakedAmount >= _amount, "Insufficient stake");
        
        _updateRewards(msg.sender);
        
        stakes[msg.sender].stakedAmount -= _amount;
        stakes[msg.sender].lastUpdateTime = block.timestamp;
        
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success, "Transfer failed");
        emit Withdrawn(msg.sender, _amount);
    }
    
    function claimRewards() external noReentrant {
        uint256 reward = _updateRewards(msg.sender);
        require(reward > 0, "No rewards to claim");
        
        (bool success, ) = msg.sender.call{value: reward}("");
        require(success, "Transfer failed");
        emit RewardsClaimed(msg.sender, reward);
    }
    
    function _updateRewards(address _user) internal returns (uint256) {
        StakeInfo storage pos = stakes[_user];
        if (pos.stakedAmount == 0) {
            return 0;
        }
        
        uint256 timeElapsed = block.timestamp - pos.lastUpdateTime;
        uint256 stakingRewards = (pos.stakedAmount * STAKING_RATE * timeElapsed) / (365 days * 100);
        
        pos.lastUpdateTime = block.timestamp;
        return stakingRewards;
    }
    
    function getStakeInfo(address _user) external view returns (uint256 stakedAmount, uint256 pendingRewards) {
        StakeInfo memory pos = stakes[_user];
        stakedAmount = pos.stakedAmount;
        
        if (pos.stakedAmount > 0) {
            uint256 timeElapsed = block.timestamp - pos.lastUpdateTime;
            pendingRewards = (pos.stakedAmount * STAKING_RATE * timeElapsed) / (365 days * 100);
        }
    }
    
    // Function to fund the contract with ETH for rewards
    function fundContract() external payable onlyOwner {}
    
    // Check contract's ETH balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
