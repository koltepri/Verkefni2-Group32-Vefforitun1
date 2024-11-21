import { el } from "../elements.js";

export function renderNavigation(navigation) {
  const navigationElement = el("ul");

  for (const item of navigation) {
    const { title, slug } = item;
    const href = `/?type=${slug}`;
    const navItemElement = el("li", el("a", { href }, title));
    navigationElement.appendChild(navItemElement);
  }

  return el("nav", navigationElement);
}
