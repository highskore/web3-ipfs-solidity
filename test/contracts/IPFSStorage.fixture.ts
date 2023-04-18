import Web3 from "web3";

import type { IPFSStorage } from "../../types/IPFSStorage.js";
import { IPFSStorage__factory } from "../../types/factories/IPFSStorage__factory.js";

export async function deployIPFSStorageFixture(web3: Web3): Promise<{ ipfsStorage: IPFSStorage }> {
  const accounts = await web3.eth.getAccounts();

  const ipfsStorageFactory = new IPFSStorage__factory();
  const ipfsStorageContract = await ipfsStorageFactory.deploy(web3, { from: accounts[0], gas: 470000 });

  return { ipfsStorage: ipfsStorageContract };
}
