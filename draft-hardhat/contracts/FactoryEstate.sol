// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "./AuctionEstate.sol";
import "./WalletEstate.sol";

contract EstateFactory is ERC1155{

    uint256 private _nextTokenId=1;
    address private latestEstateAddress;
    address private latestAuctionAddress;


    constructor()
        ERC1155("")        
    {}

    struct Estate{
        uint256 estateID;
        address payable estateOwner;
        uint256 estateEvaluation;
        string estateMetadata;
    }

    mapping (uint256 => Estate) private Estates;
    mapping (uint256 => address) private EstateInvestmentListings; //estate id -> estate wallet contract address
    mapping (uint256 => address) private EstateAuctionListings; //estate id -> estate auction contract address

    function tokenizeEstate(string memory _metadata,uint256 _evaluation) external  {
        require(_evaluation>0, "Evaluation of the Estate must be more than zero!");
        address payable addr = payable(address(msg.sender));
        //Mint Estate Token to Owner
                 
         uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        mint(addr,tokenId,1,"");
        setURI(_metadata);

        //Create Estate Listing
        Estates[tokenId] = Estate({
            estateID:tokenId,
            estateOwner: payable(address(msg.sender)),
            estateMetadata:_metadata,
            estateEvaluation: _evaluation 

        });
        
    }

    function listEstateForAuction(uint256 estateId) external {
        bytes32 _salt = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        latestAuctionAddress = Create2.deploy(0,_salt, abi.encodePacked(type(AuctionEstate).creationCode, abi.encode(estateId,Estates[estateId].estateEvaluation,block.timestamp,Estates[estateId].estateOwner))
        );
        _safeTransferFrom(msg.sender,latestAuctionAddress, estateId, 1, "");
        EstateAuctionListings[estateId] = latestAuctionAddress;
    }

    function listEstateForInvestment(uint256 estateId) external  {
        require(Estates[estateId].estateOwner==payable(address(msg.sender)),"You are not the current owner of this Estate!");

        bytes32 _salt = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        latestEstateAddress = Create2.deploy(0,_salt, abi.encodePacked(type(WalletEstate).creationCode, abi.encode(estateId,Estates[estateId].estateEvaluation))
        );

        _safeTransferFrom(msg.sender,latestEstateAddress, estateId, 1, "");

        EstateInvestmentListings[estateId] = latestEstateAddress;
        
    }

    function setURI(string memory newuri) private {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount,bytes memory data) private
    {
        _mint(account, id, amount,data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        private
        
    {
        _mintBatch(to, ids, amounts, data);
    }





}