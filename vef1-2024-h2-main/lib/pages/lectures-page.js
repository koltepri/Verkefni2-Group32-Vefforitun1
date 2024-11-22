import { el as e } from "../elements.js";
import { renderNavigation } from "../components/navigation.js";
import { fetchSubData } from "../fetcher.js";

function createLectureHTML(lecture) {
  return e(
    "div",
    { class: "card mb-4" },
    e(
      "div",
      { class: "card-body" },
      e("h4", { class: "text-primary" }, lecture.title),
      ...lecture.content.map((lectureItem) => {
        switch (lectureItem.type) {
          case "text":
            return e("p", { class: "card-text" }, lectureItem.data);
          case "quote":
            return e(
              "blockquote",
              { class: "blockquote" },
              e("p", {}, lectureItem.data),
            );
          case "heading":
            return e("h3", { class: "mt-3" }, lectureItem.data);
          case "list":
            return e(
              "ul",
              { class: "list-group list-group-flush" },
              ...lectureItem.data.map((item) =>
                e("li", { class: "list-group-item" }, item),
              ),
            );
          case "code":
            return e(
              "pre",
              { class: "bg-light p-2 rounded" },
              e("code", {}, lectureItem.data),
            );
          case "image":
            return e("img", {
              src: "/data/" + lectureItem.data,
              alt: "Lecture image",
              class: "img-fluid rounded mt-3",
              style: "max-width: 100%; height: auto;",
            });
          default:
            return null;
        }
      }),
    ),
  );
}

export async function renderLecturesPage(root, indexJson, type, content) {
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
      ...subIndexJson.lectures.map((lecture) =>
        e("div", { class: "col-md-6" }, createLectureHTML(lecture)),
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
