import fs from "fs-extra";
import { IPFSAPI } from "ipfsd-ctl";

export async function uploadFileToIPFS(ipfs: IPFSAPI, filePath: string): Promise<string> {
  try {
    // Check if the IPFS daemon is running
    await ipfs.isOnline();
  } catch (error) {
    throw new Error("IPFS daemon is not running");
  }

  let fileData;
  try {
    // Read the file data
    fileData = await fs.readFile(filePath);
  } catch (error: unknown) {
    if (error instanceof Error && "code" in error) {
      if (error.code === "ENOENT") {
        throw new Error(`File does not exist: ${filePath}`);
      } else if (error.code === "EACCES" || error.code === "EPERM") {
        throw new Error(`Permission denied: ${filePath}`);
      } else if (error.code === "ENOMEM") {
        throw new Error("Not enough memory to read the file");
      } else {
        // If the error is not related to the file not existing, permission issues or memory issues, rethrow the error
        throw error;
      }
    } else {
      throw new Error(`Unknown error type: ${error}`);
    }
  }

  try {
    // Upload the file data to IPFS
    const { cid } = await ipfs.add(fileData);
    return cid.toString();
  } catch (error: unknown) {
    throw new Error(`IPFS error: ${(error as Error).message}`);
  }
}
