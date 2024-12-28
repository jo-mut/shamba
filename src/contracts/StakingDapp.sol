// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract StakingDapp is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public stakingToken;

     constructor(IERC20 _stakingToken, address initialOwner) Ownable(initialOwner) {
        stakingToken = _stakingToken;
    }

    struct UserInfo {
        uint256 amount;
        uint lastRewardAt;
        uint lockUntil;
    }

    struct PoolInfo {
        IERC20 depositedToken;
        IERC20 rewardToken;
        uint256 depositedAmount;
        uint256 apy;
        uint lockDays;
    }

    struct Notification {
        uint256 poolID;
        uint256 amount;
        address user;
        string typeOf;
        uint timestamp;
    }

    uint decimals = 10 ** 18;
    uint public poolCount;
    PoolInfo[] public poolInfo;

    mapping(address => uint256) public depositedToken;
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    Notification[] public notifications;

    function addPool(
        IERC20 _depositedToken,
        IERC20 _rewardToken,
        uint256 _apy,
        uint _lockDays
    ) public onlyOwner {
        poolInfo.push(
            PoolInfo({ 
                depositedToken: _depositedToken, 
                rewardToken: _rewardToken, 
                depositedAmount: 0, 
                apy: _apy, 
                lockDays: _lockDays
            })
        );

        poolCount++;
    }

    function deposit(uint _poolID, uint _amount) public nonReentrant {
        require(_amount > 0, "Amount should be greater than 0");

        PoolInfo storage pool = poolInfo[_poolID];
        UserInfo storage user = userInfo[_poolID][msg.sender];

        if (user.amount > 0) {
            uint pending = _calculatePendingReward(user, _poolID);
            pool.rewardToken.transfer(msg.sender, pending);

            _createNotification(_poolID, pending, msg.sender, "Claim");

            pool.depositedToken.transferFrom(msg.sender, address(this), _amount);

            pool.depositedAmount += _amount;

            user.amount += _amount;
            user.lastRewardAt = block.timestamp;

            // user.lockUntil = block.timestamp + (pool.lockDays * 86400);
            user.lockUntil = block.timestamp + (pool.lockDays * 60);

            depositedToken[address(pool.depositedToken)] += _amount;

            _createNotification(_poolID, _amount, msg.sender, "Deposit");
        }
    }

    function withdraw(uint _poolID, uint _amount) public nonReentrant {
        PoolInfo storage pool = poolInfo[_poolID];
        UserInfo storage user = userInfo[_poolID][msg.sender];

        require(user.amount > _amount, "Widthdraw amount exceed the balance");
        require(user.lockUntil <= block.timestamp, "Lock is still Active");

        uint256 pending = _calculatePendingReward(user, _poolID);
        if (user.amount > 0) {
            pool.rewardToken.transfer(msg.sender, pending);
            _createNotification(_poolID, pending, msg.sender, "Claim");
        }

        if (_amount > 0) {
            user.amount -= _amount;
            pool.depositedAmount -= _amount;
            depositedToken[address(pool.depositedToken)] += _amount;

            pool.depositedToken.transfer(msg.sender, _amount);
        }

        user.lastRewardAt = block.timestamp;
        _createNotification(_poolID, _amount, msg.sender, "Withdraw");
    }

    function _calculatePendingReward(
        UserInfo storage user,
        uint _poolID
    ) internal view returns (uint) {
        PoolInfo storage pool = poolInfo[_poolID];

        // uint daysPassed = (block.timestamp - user.lastRewardAt) / 86400;
        uint daysPassed = (block.timestamp - user.lastRewardAt) / 60;

        if (daysPassed > pool.lockDays) {
            daysPassed = pool.lockDays;
        }

        return ((user.amount * daysPassed) / 365 / 100) * pool.apy;
    }

    function pendingReward(
        uint _poolID,
        address _user
    ) public view returns (uint) {
        UserInfo storage user = userInfo[_poolID][_user];
        return _calculatePendingReward(user, _poolID);
    }

    function swap(address token, uint256 _amount) external onlyOwner {
        uint256 token_balance = IERC20(token).balanceOf(address(this));
        require(_amount <= token_balance, "Amount exceeds balance");
        require(
            token_balance - _amount >= depositedToken[token],
            "Can't withdraw deposited token"
        );

        IERC20(token).safeTransfer(msg.sender, _amount);
    }

    function modifyPool(uint _poolID, uint _apy) public onlyOwner {
        PoolInfo storage pool = poolInfo[_poolID];
        pool.apy = _apy;
    }

    function claimReward(uint _poolID) public nonReentrant {
        PoolInfo storage pool = poolInfo[_poolID];
        UserInfo storage user = userInfo[_poolID][msg.sender];

        require(user.lockUntil <= block.timestamp, "Lock is still active");
        uint256 pending = _calculatePendingReward(user, _poolID);
        require(pending > 0, "No rewards to claim");

        user.lastRewardAt = block.timestamp;
        pool.rewardToken.transfer(msg.sender, pending);

        _createNotification(_poolID, pending, msg.sender, "Claim");
    }

    function _createNotification(
        uint _id,
        uint _amount,
        address _user,
        string memory _type
    ) internal {
        notifications.push(
            Notification({
                poolID: _id,
                amount: _amount,
                user: _user,
                typeOf: _type,
                timestamp: block.timestamp
            })
        );
    }

    function getNotification() public view returns (Notification[] memory) {
        return notifications;
    }
}
