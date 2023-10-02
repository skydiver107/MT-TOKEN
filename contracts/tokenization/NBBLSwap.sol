// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;

import "./../interfaces/IERC20.sol";
import "./../interfaces/INBBL.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IConversionRate {
    function getRateOfToken(address token) external view returns (uint256);
}

contract NBBLSwap is Ownable {
    address public _treasuryWallet;
    IConversionRate _iRate;
    INBBL _nbbl;

    event NBBLTransfered(address indexed _from, address _to, uint256 _balance);

    event SwapExcuted(
        address indexed _from,
        address _token,
        uint256 _amount1,
        address _nbbl,
        uint256 _amount2
    );

    constructor(
        address treasure,
        address conversion,
        address nbbl
    ) {
        _treasuryWallet = treasure;
        _iRate = IConversionRate(conversion);
        _nbbl = INBBL(nbbl);
    }

    function getLiveRate(address token, uint256 amount)
        public
        view
        returns (uint256)
    {
        uint256 price = _iRate.getRateOfToken(token);
        return price * amount;
    }

    function swapExactTokenForNBBL(address inputToken, uint256 amount) external {
        require(amount > 0, "Input amount must be greater than zero.");
        address user = msg.sender;
        IERC20 token = IERC20(inputToken);
        uint256 userBalance = token.balanceOf(user);
        require(amount < userBalance, "Input amount exceeds balance.");
        uint256 nbblAmount = getLiveRate(inputToken, amount);
        uint256 balance = _nbbl.balanceOf(address(this));
        require(nbblAmount > 0, "Should specify rate first");
        require(nbblAmount <= balance, "Swap amount exceeds balance.");
        _nbbl.transfer(_treasuryWallet, nbblAmount);
        token.transferFrom(user, _treasuryWallet, amount);
        emit SwapExcuted(user, inputToken, amount, address(_nbbl), nbblAmount);
    }

    function sendNbbl2Treasury(uint256 amount) public {
        address user = msg.sender;
        uint256 balance = _nbbl.balanceOf(user);
        require(amount > 0, "Input amount must be greater thatn zero.");
        require(amount <= balance, "Transfer amount exceeds balance.");
        _nbbl.transferFrom(user, _treasuryWallet, amount);
        emit NBBLTransfered(user, _treasuryWallet, amount);
    }

    function setTreasuryWallet(address treasure) external onlyOwner {
        _treasuryWallet = treasure;
    }
}