import ganache from "ganache";
import Web3 from "web3";
import type { provider } from "web3-core";

import { shouldBehaveLikeIPFSStorage } from "./IPFSStorage.behavior.js";
import { deployIPFSStorageFixture } from "./IPFSStorage.fixture.js";

describe("Contract Unit Tests", function () {
  beforeEach(async function () {
    this.web3 = new Web3(
      ganache.provider({
        quiet: true,
      }) as provider,
    );
    const accounts = await this.web3.eth.getAccounts();
    this.signers = {
      admin: accounts[0],
    };
  });

  describe("IPFSStorage", function () {
    beforeEach(async function () {
      const { ipfsStorage } = await deployIPFSStorageFixture(this.web3);
      this.ipfsStorage = ipfsStorage;
    });
    shouldBehaveLikeIPFSStorage();
  });
});
