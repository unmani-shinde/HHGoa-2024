// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "./WalletEstate.sol";
import "./AuctionEstate.sol";

contract EstateFactory is ERC1155, Ownable, ERC1155Supply{

    //TokenID = 0 represents the ERC20 Tokens

    uint256 private _nextTokenId;
    address private latestEstateAddress;
    address private latestAuctionAddress;


    constructor()
        ERC1155("https://ipfs.io/ipfs/")
        Ownable(address(msg.sender))      
    {
        _nextTokenId = 1;
    }

    struct Estate{
        uint256 estateID;
        address payable estateOwner;
        uint256 estateEvaluation;
        string estateMetadata;
    }
    
    mapping (uint256 => Estate) public Estates;
    mapping (uint256 => address) public EstateInvestmentListings; //estate id -> estate wallet contract address
    mapping (uint256 => address) public EstateAuctionListings; //estate id -> estate auction contract address

    // mapping (uint256 => address payable ) private platformUsers;

    event EstateTokenCreated(uint256 tokenId);

    // Factory Functions

    function tokenizeEstate(string memory _metadata,uint256 _evaluation) public  {
        require(_evaluation>0, "Evaluation of the Estate must be more than zero!");

        //Mint Estate Token to Owner
                 
         uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        mint(address(msg.sender),tokenId,1,"");
        setURI(_metadata);

        //Create Estate Listing
        Estates[tokenId] = Estate({
            estateID:tokenId,
            estateOwner: payable(address(msg.sender)),
            estateMetadata:_metadata,
            estateEvaluation: _evaluation 

        });
        emit EstateTokenCreated(tokenId);
        
    }

    function listEstateForAuction(uint256 estateId) public  {
        bytes32 _salt = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        latestAuctionAddress = Create2.deploy(0,_salt, abi.encodePacked(type(AuctionEstate).creationCode, abi.encode(estateId,Estates[estateId].estateEvaluation,block.timestamp,Estates[estateId].estateOwner))
        );
        _safeTransferFrom(msg.sender,latestAuctionAddress, estateId, 1, "");
        EstateAuctionListings[estateId] = latestAuctionAddress;
    }

    function listEstateForInvestment(uint256 estateId) public  {
        require(Estates[estateId].estateOwner==payable(address(msg.sender)),"You are not the current owner of this Estate!");

        bytes32 _salt = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        latestEstateAddress = Create2.deploy(0,_salt, abi.encodePacked(type(WalletEstate).creationCode, abi.encode(estateId,Estates[estateId].estateEvaluation))
        );

        _safeTransferFrom(msg.sender,latestEstateAddress, estateId, 1, "");

        EstateInvestmentListings[estateId] = latestEstateAddress;
        
    }

    function getLatestEstateAddress() public view returns (address) {
        return latestEstateAddress;
    }

     function getLatestAuctionAddress() public view returns (address) {
        return latestAuctionAddress;
    }

     function getNumEstates() public view returns(uint256) {
        return _nextTokenId-1;
    }
    
    function getEstate(uint256 estateId) public view returns (Estate memory) {
        return Estates[estateId];
    }

    

    // Wizard Functions


    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount,bytes memory data) public
    {
        _mint(account, id, amount,data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}



