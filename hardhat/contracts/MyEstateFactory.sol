// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

import "./MyEstate.sol";

contract EstateFactory is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    address private latestEstateAddress;

    struct Estate{
        uint256 estateID;
        address payable estateOwner;
        string estateName;
        uint256 estateEvaluation; //In Wei
        bool isListedforAuction;
        bool isListedtoInvest;
    }

    mapping (uint256=>Estate) public Tokens;
    mapping (address=>address[]) public InvestmentListings;

    constructor(address initialOwner)
        ERC721("MyEstate", "EST")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
    return "https://ipfs.io/ipfs/";
    }

    function CreateEstate(string memory name, string memory _uri, uint256 _evaluation) public  {

        require(_evaluation > 0, "Evaluation of the Property must be >0");

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _uri);

        Tokens[tokenId] = Estate({
            estateID: tokenId,
            estateOwner: payable(address(msg.sender)),
            estateName:name,
            isListedforAuction:false,
            isListedtoInvest:false,
            estateEvaluation: _evaluation            
        });
        
    }

    function getLatestEstateAddress() public view returns (address) {
        return latestEstateAddress;
    }

    function getNumEstates() public view returns(uint256) {
        return _nextTokenId;
    }
    
    function getEstate(uint256 estateId) public view returns (Estate memory) {
        
        return Tokens[estateId];
    }

    function ListEstateForInvestment(uint256 estateId) external returns (address) {

        require(Tokens[estateId].isListedtoInvest==false, "Property already Listed for Investment!");
        require(Tokens[estateId].estateOwner==payable(address(msg.sender)),"You are not the current owner of this Estate!");
        bytes32 _salt = keccak256(abi.encodePacked(block.timestamp, msg.sender));
        latestEstateAddress = Create2.deploy(0,_salt, abi.encodePacked(type(MyEstateWallet).creationCode, abi.encode(estateId,Tokens[estateId].estateEvaluation))
        );
        _transfer(address(msg.sender), latestEstateAddress, estateId); // Optional, depending on logic
        Tokens[estateId].isListedtoInvest = true;
        InvestmentListings[msg.sender].push(latestEstateAddress);
        return latestEstateAddress;

    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
