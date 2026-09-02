"use client";

import { useSyncExternalStore, type ReactNode } from "react";

type FrameListener = () => void;

let currentFileFrame = 1;
const listeners = new Set<FrameListener>();

export function subscribeHeroFrame(listener: FrameListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getHeroFileFrame() {
  return currentFileFrame;
}

function setFileFrame(frame: number) {
  if (frame === currentFileFrame) return;
  currentFileFrame = frame;
  listeners.forEach((listener) => listener());
}

export function HeroFrameProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useHeroFileFrame() {
  const fileFrame = useSyncExternalStore(
    subscribeHeroFrame,
    getHeroFileFrame,
    getHeroFileFrame,
  );

  return { fileFrame, setFileFrame };
}
