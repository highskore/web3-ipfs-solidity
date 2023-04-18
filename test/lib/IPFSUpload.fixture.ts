import * as ipfsModule from "ipfs";
import * as ipfsHttpModule from "ipfs-http-client";
import { createFactory } from "ipfsd-ctl";

export async function setupIPFSDaemon() {
  const factory = createFactory({
    type: "js",
    test: true,
    ipfsHttpModule,
    ipfsModule,
    ipfsBin: ipfsModule.path(),
  });

  const ipfsd = await factory.spawn({
    disposable: true,
  });

  return ipfsd;
}
