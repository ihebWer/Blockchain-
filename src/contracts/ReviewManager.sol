// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReviewManager {
    struct Review {
        uint256 id;
        address user;
        uint256 rating;
        string comment;
        uint256 timestamp;
    }

    Review[] public reviews;
    uint256 public nextId = 0;

    event ReviewAdded(uint256 id, address user, uint256 rating, string comment, uint256 timestamp);
    event ErrorOccurred(string reason);

    function addReview(uint256 rating, string memory comment) public {
        if (rating < 1 || rating > 5) {
            emit ErrorOccurred("Rating must be between 1 and 5");
            revert("Rating must be between 1 and 5");
        }
        if (bytes(comment).length == 0) {
            emit ErrorOccurred("Comment cannot be empty");
            revert("Comment cannot be empty");
        }

        uint256 newId = nextId;
        reviews.push(Review(newId, msg.sender, rating, comment, block.timestamp));
        nextId++;

        emit ReviewAdded(newId, msg.sender, rating, comment, block.timestamp);
    }

    function getReviews() public view returns (Review[] memory) {
        return reviews;
    }
}
