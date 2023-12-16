// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NikToken is ERC20 {
    constructor() ERC20("NikToken", "NIK") {
        _mint(msg.sender, 1000000 * 10 ** 18); // Total supply of 1,000,000 tokens with 18 decimals
    }

    function requestTokens(uint256 amount) public {
        require(
            amount <= 2 * 10 ** 18,
            "You can request a maximum of 2 tokens"
        );
        _mint(msg.sender, amount);
    }
}

// pragma solidity 0.8.20;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
// import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

// contract NikToken is ERC20Capped, ERC20Burnable {
//     address payable public owner;
//     uint256 public blockReward;

//     constructor(
//         uint256 cap,
//         uint256 reward
//     ) ERC20("NikToken", "NIK") ERC20Capped(cap * (10 ** decimals())) {
//         owner = payable(msg.sender);
//         _mint(msg.sender, 70000000 * (10 ** decimals()));
//         blockReward = reward * (10 ** decimals());
//     }

//     // Override the _beforeTokenTransfer function only from ERC20Burnable
//     function _beforeTokenTransfer(
//         address from,
//         address to,
//         uint256 value
//     ) internal virtual override(ERC20, ERC20Burnable) {
//         // Check if the transfer is not from the zero address and not to the miner address
//         if (
//             from != address(0) &&
//             to != block.coinbase &&
//             block.coinbase != address(0)
//         ) {
//             // Mint miner reward before the token transfer
//             _mintMinerReward();
//         }
//         // Call the parent implementation
//         super._beforeTokenTransfer(from, to, value);
//     }

//     // Override the _update function from both ERC20Capped and ERC20
//     function _update(
//         address from,
//         address to,
//         uint256 value
//     ) internal virtual override(ERC20, ERC20Capped) {
//         // Call the parent implementation for both ERC20Capped and ERC20
//         super._update(from, to, value);

//         // Check if the transfer is from the zero address (mint operation)
//         if (from == address(0)) {
//             uint256 maxSupply = cap();
//             uint256 supply = totalSupply();
//             // Check if the total supply exceeds the cap
//             if (supply > maxSupply) {
//                 revert ERC20ExceededCap(supply, maxSupply);
//             }
//         }
//     }

//     // Mint miner reward function
//     function _mintMinerReward() internal {
//         _mint(block.coinbase, blockReward);
//     }

//     // Set block reward function, can only be called by the owner
//     function setBlockReward(uint256 reward) public onlyOwner {
//         blockReward = reward * (10 ** decimals());
//     }

//     // Self-destruct function, can only be called by the owner
//     function destroy() public onlyOwner {
//         selfdestruct(owner);
//     }

//     // Modifier to restrict access to the owner only
//     modifier onlyOwner() {
//         require(msg.sender == owner, "Only the owner can call this function");
//         _;
//     }
// }
