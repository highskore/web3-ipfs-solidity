# Web3 IPFS Solidity

This is a TypeScript project that demonstrates how to use Web3.js and IPFS to interact with a Solidity smart contract
deployed on the Ethereum blockchain. The project also includes automated tests for the contract, using Mocha and Chai,
and linting with Solhint and ESLint.

## Table of Contents

- [Available Scripts](#available-scripts)
- [Installation](#installation)
- [Usage](#usage)
  - [Test](#test)
  - [Run](#run)
- [Dependencies](#dependencies)
- [Project Structure](#project-structure)
- [License](#license)

## Available Scripts

- `build`: runs the TypeScript compiler to build the project in production mode.
- `start-dev`: runs the project in development mode with ts-node.
- `start`: runs the compiled project in production mode with Node.js.
- `test`: runs automated tests for the project using Mocha and Chai.
- `lint`: runs linting with Solhint and ESLint.
- `lint:sol`: runs linting specifically for Solidity contracts using Solhint.
- `lint:ts`: runs linting specifically for TypeScript files using ESLint.
- `prettier:check`: checks code formatting with Prettier.
- `prettier:write`: formats code with Prettier.

## Installation

To install and run this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/lukaracki/web3-ipfs-solidity.git
   ```

2. Navigate to the project directory:

   ```bash
   cd web3-ipfs-solidity
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build project

   ```bash
   npm build
   ```

## Usage

### Testing

To run tests:

```bash
npm run test
```

### Running

To run the project:

```bash
npm start -- -f <file>
```

Replace <file> with the path to the file you want to upload to IPFS.

For example, to upload a file called example.txt in the project root directory:

```bash
npm start -- -f example.txt
```

## Dependencies

Some of the key libraries used in this project include:

- [Web3.js](https://github.com/ethereum/web3.js): a library for interacting with the Ethereum blockchain, providing
  utilities for working with Ethereum accounts, transactions, smart contracts, and more.
- [js-ipfs](https://github.com/ipfs/js-ipfs): a JavaScript implementation of IPFS, a distributed file system that
  provides a decentralized approach to file storage and sharing.
- [js-ipfs-ctl](https://github.com/ipfs/js-ipfsd-ctl): a client for spawning and controlling an IPFS daemon in
  JavaScript, allowing you to interact with IPFS programmatically.
- [Ganache](https://github.com/trufflesuite/ganache): a personal blockchain for Ethereum development, which allows you
  to simulate a full blockchain environment on your local machine.
- [Mocha](https://github.com/mochajs/mocha): a JavaScript testing framework that allows you to write automated tests for
  your code.
- [Chai](https://github.com/chaijs/chai): a BDD / TDD assertion library for node.js and the browser that can be paired
  with any JavaScript testing framework.
- [Solhint](https://github.com/protofire/solhint): a linter for Solidity that provides security, style guide, and best
  practices checks for your smart contract code.
- [ESLint](https://github.com/eslint/eslint): a pluggable and configurable linter tool for identifying and reporting on
  patterns in JavaScript code.

## Project Structure

    .
    ├── abi
    │   └── IPFSStorage.json
    ├── contracts
    │   └── IPFSStorage.sol
    ├── lib
    │   └── IPFSUpload.ts
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── index.ts
    │   └── main.ts
    ├── test
    │   ├── contracts
    │   │   ├── IPFSStorage.behavior.ts
    │   │   ├── IPFSStorage.fixture.ts
    │   │   └── IPFSStorage.test.ts
    │   ├── lib
    │   │   ├── IPFSUpload.behavior.ts
    │   │   ├── IPFSUpload.fixture.ts
    │   │   └── IPFSUpload.test.ts
    │   ├── src
    │   │   └── main.test.ts
    │   └── types.ts
    ├── tsconfig.json
    ├── tsconfig.prod.json
    └── types
        ├── IPFSStorage.ts
        ├── factories
        │   └── IPFSStorage__factory.ts
        ├── index.ts
        └── types.ts

The project is organized into the following directories:

- `abi`: contains the ABI (Application Binary Interface) of the smart contract, in JSON format.
- `contracts`: contains the Solidity smart contract code.
- `lib`: contains the TypeScript code for interacting with IPFS.
- `src`: contains the TypeScript code for running the application.
- `test`: contains the automated tests for the smart contract and IPFS code.
- `types`: contains TypeScript type definitions for the smart contract.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
