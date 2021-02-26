import { useRequest } from "ahooks";
import { useProjectPath } from "./useProjectPath";
import qs from "qs";

export function useLabels(
  search?: string
): { id: number; name: string; color: string; text_color: string }[] {
  const projectPath = useProjectPath();

  const { data } = useRequest(
    `/api/v4/projects/${encodeURIComponent(projectPath)}/labels?${qs.stringify({
      per_page: 100,
      search,
    })}`
  );

  return data;
}
