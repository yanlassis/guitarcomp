import test from "node:test";
import assert from "node:assert/strict";
import {
  extractYouTubeVideoId,
  formatTime,
  isValidLoop
} from "./utils.js";

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

test("extracts the video ID from a standard YouTube watch URL", function () {
  const videoId = extractYouTubeVideoId(
    "https://www.youtube.com/watch?v=M7lc1UVf-VE"
  );

  assert.equal(videoId, "M7lc1UVf-VE");
});

test("extracts the video ID from a youtu.be share URL", function () {
  const videoId = extractYouTubeVideoId(
    "https://youtu.be/M7lc1UVf-VE"
  );

  assert.equal(videoId, "M7lc1UVf-VE");
});

test("rejects malformed URL text", function () {
  assert.equal(extractYouTubeVideoId("not a URL"), null);
});

test("rejects a URL from an unsupported website", function () {
  assert.equal(
    extractYouTubeVideoId("https://example.com/watch?v=M7lc1UVf-VE"),
    null
  );
  assert.equal(extractYouTubeVideoId("https://youtu.be/"), null);
});
