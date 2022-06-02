"use strict";
exports.__esModule = true;
var vdf = require(".");
var perf_hooks_1 = require("perf_hooks");
function testVdf() {
    var buffer = new Uint8Array(Buffer.from("hello testing"));
    var iterations = 100;
    var startTime = perf_hooks_1.performance.now();
    var proof = vdf.vdfProveWesolowski(buffer, iterations);
    var midTime = perf_hooks_1.performance.now();
    var valid = vdf.vdfVerifyWesolowski(buffer, iterations, Buffer.from(proof));
    var endTime = perf_hooks_1.performance.now();
    console.log("Call to vdfProveWesolowski took ".concat(midTime - startTime, " milliseconds"));
    console.log("Call to vdfVerifyWesolowski took ".concat(endTime - midTime, " milliseconds"));
    console.log("valid: ", valid);
}
testVdf();
