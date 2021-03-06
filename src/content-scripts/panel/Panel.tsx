import React, { FC } from "react";
import styled from "styled-components";
import { PageType } from "./enums/PageType";
import { usePageType } from "./hooks/usePageType";
import { CreateIssue } from "./views/CreateIssue";

const PanelStyled = styled.div`
  width: 100%;
  height: 100%;
`;

export const Panel: FC = () => {
  const pageType = usePageType();

  return (
    <PanelStyled>
      {(() => {
        switch (pageType) {
          case PageType.CREATE_ISSUE:
            return <CreateIssue />;
          default:
            return PageType.UNKNOWN;
        }
      })()}
    </PanelStyled>
  );
};
