function label2ScopedLabel(labelElement: HTMLSpanElement): void {
  const labelTextElement = labelElement.querySelector<HTMLSpanElement>(
    ".gl-label-text"
  );

  const [scope, label] = labelTextElement.innerText.split("::");
  const color =
    labelTextElement.style.backgroundColor ||
    labelElement.style.cssText.match(/--label-background-color:(.*?)?;/)?.[1];

  console.log(scope, label, color, labelElement);

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

document
  .querySelectorAll<HTMLSpanElement>(".gl-label:not(.gl-label-scoped)")
  .forEach(label2ScopedLabel);
