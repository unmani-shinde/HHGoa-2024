// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AuctionEstate is ERC1155,IERC1155Receiver {

    uint256 private estateId;
    uint256 private estateEvaluation;
    uint256 private highestBid;
    address payable private auctionWinner;
    uint256 private timestamp;
    address payable private estateOwner;

    address payable [] private bidders;
    
    mapping (address=>uint256) private BidsPlaced;


    constructor(uint256 _id,uint256 _evaluation,uint256 _timestamp,address payable owner)
        ERC1155("")
    {   estateId = _id;
        estateEvaluation = _evaluation;
        timestamp = _timestamp;
        highestBid = 0;
        estateOwner = owner;
    }

    function getAuctionDetails() external view returns(uint256,uint256,uint256,address payable,address payable,uint256){
        return(estateId,estateEvaluation,highestBid,estateOwner,auctionWinner,timestamp);
    }

    function getAllBidders() external view returns(address payable [] memory){
        return bidders;
    }

    function getBidDetails(address payable bidder) external view returns(uint256){
        return (BidsPlaced[bidder]);
    }

    function placeBid(uint256 bid) external payable  {
        //require(block.timestamp - timestamp <= 24 hours,"This listing has expired");
        require(bid>estateEvaluation, "Bid placed must be higher than the evaluation of the timestamp");
        BidsPlaced[msg.sender] = bid;
        bidders.push(payable(address(msg.sender)));
        if(highestBid<bid){
            highestBid = bid;
            auctionWinner = payable(address(msg.sender));
        }
    }

    function declareWinner() public view returns(address payable) {
        //require(block.timestamp-timestamp> 24 hours, "Winner cannot be declared before 24 hours of the listing");
        return auctionWinner;
    }

    function withdrawMyFunds() external payable {
        //require(block.timestamp-timestamp> 24 hours, "Funds cannot be withdrawn before 24 hours of the listing");
        if(payable(address(msg.sender))!=auctionWinner){
            uint256 bidPlaced = BidsPlaced[msg.sender];
            require(bidPlaced!=0 , "You have not placed any bet in this auction");
            payable(address(msg.sender)).transfer(bidPlaced);
            BidsPlaced[address(msg.sender)] = 0;
        }
    }

    function claimPrize() external payable {
        //require(block.timestamp-timestamp> 24 hours, "Estate cannnot be claimed before 24 hours of the listing");
        if(payable(address(msg.sender))==auctionWinner){
            estateOwner.transfer(highestBid);
            _safeTransferFrom(address(this), auctionWinner, estateId, 0, "");
            BidsPlaced[address(msg.sender)] = 0;
        }  
    }

    function onERC1155Received(address, address, uint256, uint256, bytes memory) external virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) external virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    // The following functions are overrides required by Solidity.

}
