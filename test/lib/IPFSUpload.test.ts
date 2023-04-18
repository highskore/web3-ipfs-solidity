import { shouldBehaveLikeUploadIPFS } from "./IPFSUpload.behavior.js";
import { setupIPFSDaemon } from "./IPFSUpload.fixture.js";

describe("Lib Unit Tests", function () {
  // increase timeout
  this.timeout(5000);
  describe("uploadFileToIPFS", function () {
    beforeEach(async function () {
      // setup daemon
      this.ipfsController = await setupIPFSDaemon();
    });

    afterEach(async function () {
      // stop daemon
      await this.ipfsController.stop();
    });
    shouldBehaveLikeUploadIPFS();
  });
});
