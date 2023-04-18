import { Controller, ControllerType } from "ipfsd-ctl";
import Web3 from "web3";

import type { IPFSStorage } from "../types/IPFSStorage.js";

declare module "mocha" {
  export interface Context {
    ipfsStorage: IPFSStorage;
    signers: Signers;
    web3: Web3;
    ipfsController: Controller<ControllerType>;
  }
}

export interface Signers {
  admin: string;
}
