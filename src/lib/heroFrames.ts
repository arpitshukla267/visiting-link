const FRAME_FOLDER = "/webp";
const FRAME_PREFIX = "xs";
const SKIPPED_FRAME_NUMBERS = new Set([601]);

/** File numbers present in /public/webp (xs-0001 … xs-0630, excluding xs-0601). */
const FRAME_SEQUENCE: number[] = [];
for (let n = 1; n <= 630; n++) {
  if (!SKIPPED_FRAME_NUMBERS.has(n)) {
    FRAME_SEQUENCE.push(n);
  }
}

const TOTAL_FRAMES = FRAME_SEQUENCE.length;

/** Hero overlay timing — file numbers (xs-####). */
export const HERO_INTRO_EXIT_FILE = 70;
export const HERO_SERVICES_ENTER_FILE = 70;
export const HERO_SERVICES_END_FILE = 388;
export const HERO_MID_START_FILE = 388;
export const HERO_MID_END_FILE = 560;
/** CompanyStatement reveals progressively across the final 40 frames. */
export const HERO_STATEMENT_REVEAL_START_FILE = TOTAL_FRAMES - 40;
export const HERO_STATEMENT_ENTER_FILE = TOTAL_FRAMES;
export const HERO_STATEMENT_END_FILE = TOTAL_FRAMES;

const frameCache = new Map<number, HTMLImageElement>();

export function getFileNumberForIndex(index: number): number {
  const clamped = Math.min(TOTAL_FRAMES, Math.max(1, index));
  return FRAME_SEQUENCE[clamped - 1];
}

export function getIndexForFileNumber(fileNum: number): number {
  const idx = FRAME_SEQUENCE.indexOf(fileNum);
  return idx === -1 ? 1 : idx + 1;
}

/** Scroll frame index → /webp/xs-####.webp */
export const frameUrl = (index: number) => {
  const fileNum = getFileNumberForIndex(index);
  const pad = String(fileNum).padStart(4, "0");
  return `${FRAME_FOLDER}/${FRAME_PREFIX}-${pad}.webp`;
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
  options?: { maxDurationMs?: number },
): Promise<void> {
  if (areAllFramesCached()) {
    onProgress?.(TOTAL_FRAMES, TOTAL_FRAMES);
    return Promise.resolve();
  }

  const batchSize = 48;
  const maxDurationMs = options?.maxDurationMs;

  return new Promise((resolve) => {
    let loadedCount = 0;
    let loaderResolved = false;

    const finish = () => {
      if (loaderResolved) return;
      loaderResolved = true;
      resolve();
    };

    const timeoutId =
      maxDurationMs != null
        ? window.setTimeout(finish, maxDurationMs)
        : undefined;

    const loadBatch = (start: number) => {
      if (start > TOTAL_FRAMES) {
        if (timeoutId) window.clearTimeout(timeoutId);
        finish();
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

/** Keep loading remaining frames after the loader dismisses. */
export function preloadRemainingHeroFrames(): void {
  if (areAllFramesCached()) return;

  const missing: number[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    if (!frameCache.has(i)) missing.push(i);
  }

  for (const i of missing) {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => frameCache.set(i, img);
    img.src = frameUrl(i);
  }
}

export { TOTAL_FRAMES };
