"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a URL query parameter on the client without breaking static
 * prerendering: the server (and hydration) sees `null`, then React re-renders
 * with the real value.
 */
export function useQueryParam(name: string): string | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get(name),
    () => null,
  );
}

/** Reads a sessionStorage string on the client; `undefined` during SSR/hydration. */
export function useSessionValue(key: string): string | null | undefined {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => undefined,
  );
}
