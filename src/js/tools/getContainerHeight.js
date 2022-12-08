/**
 * creates an invisible clone measures its height , deletes clone and returns height
 * https://frontendcoding.com/getting-the-height-of-a-hidden-element/
 * @param {Element} container element you want height of.
 * @returns Number
 */
export function getHiddenHeight(container) {
  const clone = container.cloneNode(true);

  Object.assign(clone.style, {
    overflow: "visible",
    height: "auto",
    maxHeight: "none",
    opacity: "0",
    visibility: "hidden",
    display: "block",
  });

  container.after(clone);
  const height = clone.offsetHeight;
  clone.remove();
  return height;
}
