import { useMemo } from "react";

export enum PageType {
  CREATE_ISSUE = "CREATE_ISSUE",
  UNKNOWN = "UNKNOWN",
}

export function usePageType(): string {
  return useMemo(() => {
    const { pathname } = new URL(window.location.href);

    if (pathname.includes("/-/issues/new")) {
      return PageType.CREATE_ISSUE;
    }

    return PageType.UNKNOWN;
  }, [window.location.href]);
}
