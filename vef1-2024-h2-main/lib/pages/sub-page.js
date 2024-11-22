import { renderNavigation } from "../components/navigation.js";
import { el } from "../elements.js";
import { fetcher } from "../fetcher.js";

export async function renderSubpage(root, indexJson, type) {
  const headerElement = el("header", {}, el("h1", {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  let mainElement;
  const foundType = indexJson.navigation.some((i) => i.slug === type);

  if (!foundType) {
    mainElement = el("main", {}, el("p", {}, "Fannst ekki"));
  } else {
    const content = (await fetcher(`data/${type}/index.json`)).content;

    const contentElement = el(
      "div",
      {
        class: "container mt-4 d-flex flex-wrap justify-content-center",
      },
      ...content.map((item) => {
        const button = el(
          "button",
          {
            class: "card h-100",
            style: "background-color: #f5f5dc; cursor: pointer",
          },
          el(
            "div",
            { class: "card-body" },
            el("h5", { class: "card-title" }, item.title),
            el("p", { class: "card-text mt-2" }, item.text),
          ),
        );

        button.addEventListener("click", () => {
          window.location.href = `/?type=${type}&content=${item.slug}`;
        });

        return el(
          "div",
          { class: "col-md-4 d-flex justify-content-center" },
          button,
        );
      }),
    );

    mainElement = el("main", {}, contentElement);
  }

  const footerElement = el(
    "footer",
    { class: "text-center py-4 mt-5" },
    indexJson.footer,
  );

  root.append(headerElement, mainElement, footerElement);
}
