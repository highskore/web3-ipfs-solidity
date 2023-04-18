// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract IPFSStorage {
    string private ipfsCid;

    function storeCID(string calldata cid) public {
        ipfsCid = cid;
    }

    function getCID() public view returns (string memory) {
        require(bytes(ipfsCid).length > 0, "CID not set");
        return ipfsCid;
    }
}
