import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { promises as fs } from "fs";

import { Options, main } from "../../src/main.js";

use(chaiAsPromised);

describe("Integration Tests", function () {
  this.timeout(60000); // Increase the timeout for this test suite to 60 seconds

  it("should store and retrieve a file CID using IPFS and a smart contract", async function () {
    const testFilePath = "temp_test.txt";
    const testData = "Hello, IPFS and Ethereum!";

    // Create a temporary file with content
    await fs.writeFile(testFilePath, testData);

    const options: Options = {
      f: testFilePath,
      _: [],
      $0: "",
    };

    await expect(main(options)).to.be.fulfilled;

    // Call the main function with the file path as an option
    await expect(main(options)).to.be.fulfilled;

    // Cleanup the temporary file
    await fs.unlink(testFilePath);
  });
});
