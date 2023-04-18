import yargs from "yargs";

import { Options, main } from "./main.js";

const options = yargs(process.argv.slice(2))
  .options({
    f: {
      alias: "file",
      type: "string",
      description: "The path to the file to upload to IPFS",
      demandOption: true,
    },
  })
  .version(false).argv as Options;

main(options)
  .catch((e) => console.error(e))
  .finally(() => process.exit(0));
