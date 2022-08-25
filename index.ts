export interface vdfInterface {
  vdfProveWesolowski: (challenge: Uint8Array, iterations: number) => Uint8Array;
  vdfVerifyWesolowski: (
    challenge: Uint8Array,
    iterations: number,
    proof: Uint8Array
  ) => boolean;
}

export default vdf: vdfInterface = require(".");

function testVdf() {
  const buffer = new Uint8Array(Buffer.from("hello testing"));
  const iterations = 100;

  const proof: Uint8Array = vdf.vdfProveWesolowski(buffer, iterations);
  console.log(proof);

  const valid: boolean = vdf.vdfVerifyWesolowski(
    buffer,
    iterations,
    Buffer.from(proof)
  );
  console.log("valid: ", valid);
}

function timeTest() {
  console.log(`Testing performance, aa 90000 iterations`);
  const buffer = new Uint8Array(Buffer.from("aa", "hex"));
  const iterations = 90000;

  console.time("prove");
  vdf.vdfProveWesolowski(buffer, iterations);
  console.timeEnd("prove");
}

