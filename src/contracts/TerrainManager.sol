// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TerrainManager {
    struct Terrain {
        uint256 id;
        string title;
        string description;
        uint256 capacity;
        bool isAvailable;
    }

    struct Reservation {
        uint256 terrainId;
        address user;
        uint256 startTime;
        uint256 endTime;
    }

    Terrain[] public terrains;
    Reservation[] public reservations;
    uint256 public nextId = 0;

    event TerrainAdded(uint256 id, string title, uint256 capacity);
    event ErrorOccurred(string reason);
    event ReservationMade(uint256 terrainId, address user, uint256 startTime, uint256 endTime);

    function addTerrain(string memory title, string memory description, uint256 capacity) public {
        if (bytes(title).length == 0) {
            emit ErrorOccurred("Title cannot be empty");
            revert("Title cannot be empty");
        }
        if (capacity == 0) {
            emit ErrorOccurred("Capacity must be greater than 0");
            revert("Capacity must be greater than 0");
        }
        if (bytes(description).length == 0) {
            emit ErrorOccurred("Description cannot be empty");
            revert("Description cannot be empty");
        }

        uint256 newId = nextId;
        terrains.push(Terrain(newId, title, description, capacity, true));
        nextId++;

        emit TerrainAdded(newId, title, capacity);
    }

    function listAvailableTerrains(uint256 startTime, uint256 endTime) public view returns (Terrain[] memory) {
        uint count = 0;
        for (uint i = 0; i < terrains.length; i++) {
            if (terrains[i].isAvailable && isTerrainAvailable(terrains[i].id, startTime, endTime)) {
                count++;
            }
        }

        Terrain[] memory availableTerrains = new Terrain[](count);
        uint index = 0;
        for (uint i = 0; i < terrains.length; i++) {
            if (terrains[i].isAvailable && isTerrainAvailable(terrains[i].id, startTime, endTime)) {
                availableTerrains[index] = terrains[i];
                index++;
            }
        }

        return availableTerrains;
    }

    function isTerrainAvailable(uint256 terrainId, uint256 startTime, uint256 endTime) internal view returns (bool) {
        for (uint i = 0; i < reservations.length; i++) {
            if (reservations[i].terrainId == terrainId && 
                !(reservations[i].endTime <= startTime || reservations[i].startTime >= endTime)) {
                return false;
            }
        }
        return true;
    }

    function makeReservation(uint256 terrainId, uint256 startTime, uint256 endTime) public {
        require(isTerrainAvailable(terrainId, startTime, endTime), "Terrain is not available for the requested time period");

        reservations.push(Reservation({
            terrainId: terrainId,
            user: msg.sender,
            startTime: startTime,
            endTime: endTime
        }));

        emit ReservationMade(terrainId, msg.sender, startTime, endTime);
    }

    function testConnection() public pure returns (bool) {
        return true;
    }

    function getTotalTerrains() public view returns (uint256) {
        return terrains.length;
    }
}
