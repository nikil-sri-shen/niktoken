// async function main() {
//   const MyToken = await ethers.getContractFactory("NikToken");
//   const myToken = await MyToken.deploy();
//   //await myToken.deployed();

//   console.log("Contract deployed to address:", myToken.target);

//   // Print the contract ABI
//   console.log("Contract ABI:");
//   console.log(JSON.stringify(MyToken.interface));
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

const { ethers } = require("hardhat");

async function main() {
  const MyToken = await ethers.getContractFactory("NikToken");
  const myToken = await MyToken.deploy();
  //await myToken.deployed();

  console.log("Contract deployed to address:", myToken.address);

  // Print the contract ABI in the desired format
  const abi = MyToken.interface.fragments.map((fragment) => {
    return {
      type: fragment.type,
      name: fragment.name,
      inputs: fragment.inputs.map((input) => ({
        name: input.name,
        type: input.type,
      })),
      outputs: fragment.outputs.map((output) => ({
        name: output.name,
        type: output.type,
      })),
    };
  });

  console.log("Contract ABI:");
  console.log(JSON.stringify(abi, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
