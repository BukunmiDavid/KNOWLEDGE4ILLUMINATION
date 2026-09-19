const YOUTUBE_RE =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

export function extractYouTubeId(url: string | undefined | null): string | null {
  if (!url) return null;
  const match = url.match(YOUTUBE_RE);
  return match ? match[1] : null;
}

export function buildEmbedUrl(videoId: string, startAt?: number): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    color: "white",
  });
  if (startAt && startAt > 0) params.set("start", String(startAt));
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function buildThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function normalizeYoutubeUrl(input: string): string {
  return `https://www.youtube.com/watch?v=${input}`;
}