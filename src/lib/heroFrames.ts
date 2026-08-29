const TOTAL_FRAMES = 240;
const FRAME_FOLDER = "/frames3/hero-bg_frames";

const frameCache = new Map<number, HTMLImageElement>();

export const frameUrl = (index: number) => {
  const pad = String(index).padStart(3, "0");
  return `${FRAME_FOLDER}/frame_${pad}.jpg`;
};

export function getCachedFrame(index: number): HTMLImageElement | null {
  const clamped = Math.min(TOTAL_FRAMES, Math.max(1, index));
  return frameCache.get(clamped) ?? null;
}

export function areAllFramesCached(): boolean {
  return frameCache.size >= TOTAL_FRAMES;
}

export function preloadAllHeroFrames(
  onProgress?: (loaded: number, total: number) => void,
): Promise<void> {
  if (areAllFramesCached()) {
    onProgress?.(TOTAL_FRAMES, TOTAL_FRAMES);
    return Promise.resolve();
  }

  const batchSize = 16;

  return new Promise((resolve) => {
    let loadedCount = 0;

    const loadBatch = (start: number) => {
      if (start > TOTAL_FRAMES) {
        resolve();
        return;
      }

      const end = Math.min(start + batchSize - 1, TOTAL_FRAMES);
      const promises: Promise<void>[] = [];

      for (let i = start; i <= end; i++) {
        if (frameCache.has(i)) {
          loadedCount++;
          onProgress?.(loadedCount, TOTAL_FRAMES);
          continue;
        }

        promises.push(
          new Promise<void>((res) => {
            const img = new window.Image();
            img.decoding = "async";
            img.onload = () => {
              frameCache.set(i, img);
              loadedCount++;
              onProgress?.(loadedCount, TOTAL_FRAMES);
              res();
            };
            img.onerror = () => {
              loadedCount++;
              onProgress?.(loadedCount, TOTAL_FRAMES);
              res();
            };
            img.src = frameUrl(i);
          }),
        );
      }

      if (promises.length === 0) {
        loadBatch(end + 1);
        return;
      }

      Promise.all(promises).then(() => loadBatch(end + 1));
    };

    loadBatch(1);
  });
}

export { TOTAL_FRAMES };
