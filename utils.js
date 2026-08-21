//formating seconds to proper timing
export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

//loop validation
export function isValidLoop(loopStart, loopEnd) {
  return loopStart !== null && loopEnd !== null && loopStart < loopEnd;
}

//extracting id/url
export function extractYouTubeVideoId(urlText) {
  let parsedUrl;

  try {
    parsedUrl = new URL(urlText);
  } catch {
    return null;
  }

  if (parsedUrl.hostname === "youtu.be") {
    const videoId = parsedUrl.pathname.slice(1);

    if (videoId === "") {
      return null;
    }

    return videoId;
  }

  const isStandardWatchUrl = 
    parsedUrl.hostname === "www.youtube.com" && parsedUrl.pathname === "/watch";

  if (!isStandardWatchUrl) {
    return null;
  }

  return parsedUrl.searchParams.get("v");
}
