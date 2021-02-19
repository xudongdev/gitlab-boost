function label2ScopedLabel(labelElement: HTMLSpanElement): void {
  const labelTextElement = labelElement.querySelector<HTMLSpanElement>(
    ".gl-label-text"
  );

  const [scope, label] = labelTextElement.innerText.split("::");
  const color =
    labelTextElement.style.backgroundColor ||
    labelElement.style.cssText.match(/--label-background-color:(.*?)?;/)?.[1];

  if (scope && label && color) {
    labelElement.className = `${labelElement.className} gl-label-scoped`;
    labelElement.setAttribute(
      "style",
      [
        ...(labelTextElement.style.backgroundColor
          ? []
          : [`--label-background-color: ${color}`]),
        ...(labelTextElement.style.backgroundColor ? [`color: ${color}`] : []),
        `--label-inset-border: inset 0 0 0 1px ${color}`,
      ].join("; ")
    );

    labelTextElement.innerText = scope;

    labelTextElement.parentNode.appendChild(
      document
        .createRange()
        .createContextualFragment(
          `<span class="gl-label-text-scoped">${label}</span>`
        )
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((window as any).gon.gitlab_url) {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (
            node?.classList?.contains("gl-label") &&
            !node?.classList?.contains("gl-label-scoped")
          ) {
            label2ScopedLabel(node);
          } else {
            node
              .querySelectorAll(".gl-label:not(.gl-label-scoped)")
              .forEach(label2ScopedLabel);
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  document
    .querySelectorAll(".gl-label:not(.gl-label-scoped)")
    .forEach(label2ScopedLabel);
}
