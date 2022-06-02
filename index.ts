interface vdf {
  vdfProveWesolowski: (challenge: Uint8Array, iterations: number) => Uint8Array;
  vdfVerifyWesolowski: (
    challenge: Uint8Array,
    iterations: number,
    proof: Uint8Array
  ) => boolean;
}

const vdf: vdf = require(".");
import { performance } from "perf_hooks";

function testVdf() {
  const buffer = new Uint8Array(Buffer.from("hello testing"));
  const iterations = 100;

  var startTime = performance.now();
  const proof: Uint8Array = vdf.vdfProveWesolowski(buffer, iterations);
  var midTime = performance.now();
  const valid: boolean = vdf.vdfVerifyWesolowski(
    buffer,
    iterations,
    Buffer.from(proof)
  );
  var endTime = performance.now();

  console.log("valid: ", valid);
  console.log(
    `Call to vdfProveWesolowski took ${midTime - startTime} milliseconds`
  );
  console.log(
    `Call to vdfVerifyWesolowski took ${endTime - midTime} milliseconds`
  );
}

testVdf();
