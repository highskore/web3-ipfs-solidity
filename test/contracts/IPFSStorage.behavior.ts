import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);

export function shouldBehaveLikeIPFSStorage(): void {
  describe("storeCID", function () {
    it("should store and return the CID", async function () {
      const cid = "QmXJ9cLpSGKgtfV7hDzFPhFJyoKjBtN1Q7hdD5Jmc56Q9m";
      await this.ipfsStorage.methods.storeCID(cid).send({ from: this.signers.admin });

      const storedCID = await this.ipfsStorage.methods.getCID().call({ from: this.signers.admin });
      expect(storedCID).to.equal(cid);
    });
  });

  describe("getCID", function () {
    it("should revert if the CID is not set", async function () {
      await expect(this.ipfsStorage.methods.getCID().call({ from: this.signers.admin })).to.be.rejectedWith(
        "CID not set",
      );
    });
  });
}
