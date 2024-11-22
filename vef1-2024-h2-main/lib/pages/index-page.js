import { renderNavigation } from "../components/navigation";
import { el } from "../elements";

export function renderIndexPage(root, indexJson) {
  console.log("rendering", root, indexJson.title);

  const headerElement = el(
    "header",
    { class: "text-center py-4 mb-4 bg-light" },
    el("h1", {}, indexJson.title),
  );

  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const footerElement = el(
    "footer",
    { class: "text-center py-4 mt-5 bg-light" },
    indexJson.footer,
  );

  root.appendChild(headerElement);
  root.appendChild(footerElement);
}
