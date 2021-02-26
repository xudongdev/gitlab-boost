import { useMemo } from "react";
import { PageType } from "../enums/PageType";
import { getPageType } from "../utils/getPageType";

export function usePageType(): PageType {
  return useMemo(() => getPageType(), [window.location.href]);
}
