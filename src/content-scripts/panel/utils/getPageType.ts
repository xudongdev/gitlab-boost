import { PageType } from "../enums/PageType";

export function getPageType(): PageType {
  const { pathname } = new URL(window.location.href);

  if (pathname.includes("/-/issues/new")) {
    return PageType.CREATE_ISSUE;
  }

  return PageType.UNKNOWN;
}
