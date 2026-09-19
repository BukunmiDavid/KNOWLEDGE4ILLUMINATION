"use client";

import { useMemo } from "react";
import {
  extractYouTubeId,
  buildEmbedUrl,
} from "@/lib/courses/youtube";

export function YouTubeEmbed({
  url,
  title,
  startAt,
  className,
}: {
  url: string;
  title: string;
  startAt?: number;
  className?: string;
}) {
  const videoId = useMemo(() => extractYouTubeId(url), [url]);

  if (!videoId) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-surface p-8 text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-faint">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m10 9 5 3-5 3V9z" />
        </svg>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-xs text-faint">
          No embeddable YouTube link has been added to this lesson yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-card ${className ?? ""}`}
    >
      <iframe
        className="absolute inset-0 h-full w-full"
        src={buildEmbedUrl(videoId, startAt)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}