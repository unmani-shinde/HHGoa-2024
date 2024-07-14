// SPDX-License-Identifier: MIT
//Multi-Signature Wallet Contract

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

pragma solidity ^0.8.2;

contract MyEstateWallet is ERC20, ERC20Permit {
    address payable private estateOwner;
    uint256 private estateId;
    address payable [] estateWalletOwners;

    function getOwner() public view returns (address) {
        return estateOwner;
    }
    constructor(uint256 _estateid) ERC20("EstateWalletTokens", "ESWT")
        ERC20Permit("EstateWalletTokens") {
        estateOwner = payable(address(msg.sender));  
        estateId = _estateid;  
        _mint(address(this), 100 * 10 ** decimals());
    }

    function getWalletOwners() public view returns(address payable [] memory) {
        return estateWalletOwners;
    }


}
