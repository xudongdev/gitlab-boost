import React, { FC } from "react";
import styled from "styled-components";
import { useLabels } from "../hooks/useLabels";

export const CreateIssue: FC = () => {
  const statusLabels = useLabels("状态::");
  const priorityLabels = useLabels("优先级::");
  const issueTypeLabels = useLabels("议题类型::");

  const featureTypeLabels = useLabels("需求类型::");
  const featureSourceLabels = useLabels("需求来源::");

  const bugTypeLabels = useLabels("缺陷类型::");
  const bugCauseLabels = useLabels("缺陷原因::");
  const bugLevelLabels = useLabels("缺陷等级::");

  return <div>{JSON.stringify(issueTypeLabels)}</div>;
};
