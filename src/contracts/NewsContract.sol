// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewsContract {
    struct News {
        uint256 id;
        string title;
        string content;
        uint256 date;
    }

    News[] public news;

    function getNews() public view returns (News[] memory) {
        return news;
    }

    function getNewsById(uint256 _id) public view returns (News memory) {
        require(_id < news.length, "News item does not exist");
        return news[_id];
    }

    // Function to add news
    function addNews(string memory _title, string memory _content, uint256 _date) public {
        news.push(News(news.length, _title, _content, _date));
    }
}
