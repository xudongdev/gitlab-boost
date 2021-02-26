import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { AppProvider } from "superboost-ui";
import { PageType } from "./enums/PageType";
import { Panel } from "./Panel";
import { getPageType } from "./utils/getPageType";
import { hidePanel } from "./utils/hidePanel";
import { showPanel } from "./utils/showPanel";

if ([PageType.CREATE_ISSUE].includes(getPageType())) {
  document.body.appendChild(
    document.createRange().createContextualFragment(/* HTML */ `<div
      id="glb-button"
    >
      <style>
        #glb-button {
          position: fixed;
          right: 1rem;
          bottom: 1rem;

          background: #303030;
          width: 60px;
          height: 60px;
          border-radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;

          cursor: pointer;
        }

        #glb-button img {
          width: 36px;
          height: 36px;
        }
      </style>
      <img
        src="https://assets.gitlab-static.net/assets/gitlab_logo-7ae504fe4f68fdebb3c2034e36621930cd36ea87924c11ff65dbcb8ed50dca58.png"
      />
    </div>`)
  );

  document.body.appendChild(
    document.createRange().createContextualFragment(/* HTML */ `<div
      id="glb-panel"
    >
      <style>
        #glb-panel {
          z-index: 10000;
          position: fixed;
          top: 0;
          left: 0;

          display: none;
          justify-content: center;
          align-items: center;

          background: rgba(0, 0, 0, 0.5);
          width: 100vw;
          height: 100vh;
        }

        #glb-panel-mask {
          position: fixed;
          top: 0;
          left: 0;

          width: 100vw;
          height: 100vh;
        }

        #glb-panel-content {
          position: relative;
        }
      </style>
      <div id="glb-panel-mask"></div>
      <div id="glb-panel-content"></div>
    </div>`)
  );

  const button: HTMLDivElement = document.querySelector("#glb-button");
  const panelMask: HTMLDivElement = document.querySelector("#glb-panel-mask");
  const panelContent: HTMLDivElement = document.querySelector(
    "#glb-panel-content"
  );

  button.addEventListener("click", () => showPanel());
  panelMask.addEventListener("click", () => hidePanel());

  const GlobalStyle = createGlobalStyle`
    body {
      font-size: 14px;
      line-height: 1.5;
    }
  `;

  ReactDOM.render(
    <AppProvider>
      <GlobalStyle />
      <Panel />
    </AppProvider>,
    panelContent
  );
}
