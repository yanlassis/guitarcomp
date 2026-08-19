import test from "node:test";
import assert from "node:assert/strict";
import { formatTime, isValidLoop } from "./utils.js";

test("formats seconds as minutes and padded seconds", function () {
  assert.equal(formatTime(125.9), "2:05");
});

test("accepts a loop whose start is before its end", function () {
  assert.equal(isValidLoop(70, 85), true);
});

test("rejects a loop with a missing point", function () {
  assert.equal(isValidLoop(null, 85), false);
  assert.equal(isValidLoop(70, null), false);
});

test("rejects a loop whose end is not after its start", function () {
  assert.equal(isValidLoop(70, 70), false);
  assert.equal(isValidLoop(85, 70), false);
});
