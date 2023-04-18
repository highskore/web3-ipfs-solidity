import ganache from "ganache";
import * as ipfsModule from "ipfs";
import * as ipfsHttpModule from "ipfs-http-client";
import { createFactory } from "ipfsd-ctl";
import Web3 from "web3";
import type { provider } from "web3-core";

import { uploadFileToIPFS } from "../lib/IPFSUpload.js";
import { IPFSStorage__factory } from "../types/factories/IPFSStorage__factory.js";

export interface Options {
  f: string;
  _: (string | number)[]; // Allow for both strings and numbers
  $0: string;
}

export async function main(options: Options) {
  const filePath = options.f;

  // create a daemon factory
  const factory = createFactory({
    type: "js",
    test: true,
    disposable: true,
    ipfsHttpModule,
    ipfsModule,
    ipfsBin: ipfsModule.path(),
  });

  // spawn daemon
  const ipfsd = await factory.spawn({ type: "js" });

  // upload the file to IPFS
  console.log("\n🚀 Uploading file to IPFS...");
  const cid = await uploadFileToIPFS(ipfsd.api, filePath);
  console.log(`✅ File uploaded to IPFS. CID: ${cid}`);

  // start the ganache provider
  console.log("\n🏭 Starting Ganache provider...");
  const web3 = new Web3(
    ganache.provider({
      quiet: true,
    }) as provider,
  );
  console.log("✅ Ganache provider started.");

  // deploy the contract
  console.log("\n🚀 Deploying contract...");
  const accounts = await web3.eth.getAccounts();
  const ipfsStorageFactory = new IPFSStorage__factory();
  const ipfsStorageContract = await ipfsStorageFactory.deploy(web3, { from: accounts[0], gas: 470000 });
  console.log("✅ Contract deployed.");

  // send the transaction to store the CID
  console.log("\n🚀 Sending transaction...");
  await ipfsStorageContract.methods.storeCID(cid).send({ from: accounts[0] });
  console.log("✅ Transaction sent.");

  // retrieve the stored CID
  console.log("\n🔍 Retrieving stored CID...");
  const storedCID = await ipfsStorageContract.methods.getCID().call({ from: accounts[0] });
  console.log(`✅ Stored CID: ${storedCID}`);

  // stop the daemon
  await ipfsd.stop();
}
