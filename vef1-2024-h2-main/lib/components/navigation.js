import { el } from "../elements.js";
export function renderNavigation(navigation, onClickHandler) {
  return el(
    "nav",
    { class: "navbar navbar-expand-lg bg-light mb-4" },
    el(
      "ul",
      { class: "navbar-nav ms-auto me-auto gap-3" },
      ...navigation.map(({ title, slug }) =>
        el(
          "li",
          { class: "nav-item" },
          el(
            "a",
            {
              href: `/?type=${slug}`,
              class: "nav-link",
            },
            title,
          ),
        ),
      ),
    ),
  );
}
