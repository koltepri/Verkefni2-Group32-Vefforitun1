import { el as e } from "../elements.js";
import { renderNavigation } from "../components/navigation.js";
import { fetchSubData } from "../fetcher.js";

function createKeywordHTML(keyword) {
  return e(
    "div",
    { class: "card mb-4" },
    e(
      "div",
      { class: "card-body" },
      e("h4", { class: "text-primary" }, keyword.title),
      e("p", { class: "text-italic small" }, keyword.english),
      e("div", { class: "card-text" }, keyword.content),
    ),
  );
}

export async function renderKeywordsPage(root, indexJson, type, content) {
  console.log("rendering keywords page", root, indexJson.title);

  const headerElement = e(
    "header",
    { class: "text-center py-4 mb-4 bg-light" },
    e("h1", {}, indexJson.title),
  );
  headerElement.appendChild(renderNavigation(indexJson.navigation, type));

  const subIndexJson = await fetchSubData(type, content);

  const mainElement = e(
    "main",
    { class: "container" },
    e("h2", { class: "text-center mb-4" }, subIndexJson.title),
    e(
      "div",
      { class: "row" },
      ...subIndexJson.keywords.map((keyword) =>
        e("div", { class: "col-md-6" }, createKeywordHTML(keyword)),
      ),
    ),
  );

  const footerElement = e(
    "footer",
    { class: "text-center py-4 mt-5 bg-light" },
    indexJson.footer,
  );

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
