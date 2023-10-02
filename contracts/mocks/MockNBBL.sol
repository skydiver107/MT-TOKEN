// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../common/Ownable.sol";

contract MockNBBL is ERC20, Ownable {

    constructor(uint256 _premint)
        Ownable(msg.sender) ERC20("NBBL_TOKEN", "NBBL") {
        _mint(msg.sender, _premint);
    }

}