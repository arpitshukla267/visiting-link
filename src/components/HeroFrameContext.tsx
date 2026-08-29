"use client";

import { useSyncExternalStore, type ReactNode } from "react";

type FrameListener = () => void;

let currentFileFrame = 1;
const listeners = new Set<FrameListener>();

function subscribe(listener: FrameListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getFileFrame() {
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
    subscribe,
    getFileFrame,
    getFileFrame,
  );

  return { fileFrame, setFileFrame };
}
