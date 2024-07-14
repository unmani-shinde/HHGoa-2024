// SPDX-License-Identifier: MIT
//Estate Wallet Contract

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";


pragma solidity ^0.8.2;

contract MyEstateWallet is ERC20, ERC20Permit {
    address payable private estateOwner;
    uint256 private estateId;
    uint256 private estateEvaluation;
    uint256 numInvestors;

    mapping (address=>uint256) public estateInvestments;
    address payable [] private estateInvesters;


    function getOwner() public view returns (address) {
        return estateOwner;
    }

    constructor(uint256 _estateid,uint256 _estateevaluation) ERC20("EstateWalletTokens", "ESWT")
        ERC20Permit("EstateWalletTokens") {
        estateOwner = payable(address(msg.sender));  
        estateId = _estateid; 
        estateEvaluation = _estateevaluation;
        _mint(address(this), 100 * 10 ** decimals());
        numInvestors = 0;
    }

    modifier onlyOwner(){
        require(getOwner()==msg.sender,"Only the estate owner can withdraw the funds");
        _;
    }

    function getInvestments() public view returns (uint256[] memory) {
        uint256[] memory investments = new uint256[](numInvestors);
        for(uint256 i =0; i<estateInvesters.length;i++){
            investments[i] = estateInvestments[estateInvesters[i]];
        }
        return investments;

    }

    function purchaseShares(uint256 quantity) public payable {
        require(quantity>0, "Quantity of Shares to be purchase should be >0");
        require(balanceOf(address(this)) >= quantity, "Not enough shares to be purchased!");
        uint256 value = (estateEvaluation/100) * quantity;
        require(value==msg.value,"Insufficient funds sent by the purchaser!");
        _transfer(address(this), payable (address(msg.sender)), quantity);
        estateInvestments[payable(address(msg.sender))] = quantity;
        estateInvesters.push(payable (address(msg.sender)));
    }

    function sellShares(uint256 sellshares) public payable  {
        
    }

    function withdrawFunds() public onlyOwner{
        address payable owner = payable(getOwner());
        owner.transfer(balanceOf(address(this)));        
    }


}
