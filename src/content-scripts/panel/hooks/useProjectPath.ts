import { useMemo } from "react";

export function useProjectPath(): string {
  return useMemo(() => {
    const { pathname } = new URL(window.location.href);
    return pathname.split("/-/")[0].slice(1);
  }, [window.location.href]);
}
