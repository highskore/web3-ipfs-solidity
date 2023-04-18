import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { promises as fs } from "fs";

import { uploadFileToIPFS } from "../../lib/IPFSUpload.js";

use(chaiAsPromised);

export function shouldBehaveLikeUploadIPFS(): void {
  const testFilePath = "test.txt";
  const testData = "Hello, IPFS!";
  const nonExistentFilePath = "non-existent.txt";
  const permissionDeniedFilePath = "permission-denied.txt";

  it("should upload a file to IPFS and return a valid CID", async function () {
    // Create a test file with some data
    await fs.writeFile(testFilePath, testData);

    // Upload the test file to IPFS
    const cid = await uploadFileToIPFS(this.ipfsController.api, testFilePath);

    // Check that the uploaded file is retrievable from IPFS
    let content = "";
    for await (const chunk of this.ipfsController.api.cat(cid)) {
      content += Buffer.from(chunk).toString();
    }
    expect(content).to.equal(testData);

    // Cleanup the test file
    await fs.unlink(testFilePath);
  });

  it("should throw an error if the IPFS daemon is not running", async function () {
    await this.ipfsController.api.stop();

    // Create a test file with some data
    await fs.writeFile(testFilePath, testData);

    // Try uploading the test file to IPFS
    await expect(uploadFileToIPFS(this.ipfsController.api, testFilePath)).to.be.rejectedWith(
      "IPFS daemon is not running",
    );

    // Cleanup the test file
    await fs.unlink(testFilePath);
  });

  it("should throw an error if the file does not exist", async function () {
    await expect(uploadFileToIPFS(this.ipfsController.api, nonExistentFilePath)).to.be.rejectedWith(
      `File does not exist: ${nonExistentFilePath}`,
    );
  });

  it("should throw an error if the file has permission issues", async function () {
    // Create a test file with no read permission
    await fs.writeFile(permissionDeniedFilePath, testData);
    await fs.chmod(permissionDeniedFilePath, 0o222); // Write-only permission

    await expect(uploadFileToIPFS(this.ipfsController.api, permissionDeniedFilePath)).to.be.rejectedWith(
      `Permission denied: ${permissionDeniedFilePath}`,
    );

    // Cleanup the test file
    await fs.unlink(permissionDeniedFilePath);
  });

  // Memory issues test case is hard to create, as it depends on the system resources.

  it("should throw an error if there is an IPFS-related error", async function () {
    // Create a test file with some data
    await fs.writeFile(testFilePath, testData);

    // Modify the IPFS API add method to throw an error
    const originalAdd = this.ipfsController.api.add;
    this.ipfsController.api.add = async () => {
      throw new Error("Fake IPFS error");
    };

    await expect(uploadFileToIPFS(this.ipfsController.api, testFilePath)).to.be.rejectedWith(
      "IPFS error: Fake IPFS error",
    );

    // Cleanup the test file and restore the original IPFS API add method
    await fs.unlink(testFilePath);
    this.ipfsController.api.add = originalAdd;
  });
}
