// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ShareFile {
    struct File {
        address owner;
        string fileHash;
        address recipient;
    }

    mapping(string => File) public files;

    event FileShared(string fileHash, address indexed owner, address indexed recipient);

    function shareFile(string memory fileHash, address recipient) public {
        files[fileHash] = File(msg.sender, fileHash, recipient);
        emit FileShared(fileHash, msg.sender, recipient);
    }
}
