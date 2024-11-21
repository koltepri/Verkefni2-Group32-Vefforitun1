import { el as e } from "../elements.js";

function createLectureHTML(lecture) {
  return e(
    "div",
    e("h4", lecture.title),
    ...lecture.content.map((content) => {
      switch (content.type) {
        case "text":
          return e("p", content.data);
        case "quote":
          return e("blockquote", e("p", content.data));
        case "heading":
          return e("h3", content.data);
        case "list":
          return e("ul", ...content.data.map((item) => e("li", {}, item)));
        case "code":
          return e("pre", e("code", content.data));
        default:
          return null;
      }
    }),
  );
}

export async function renderLecturePage(root, indexJson, type, content) {
  console.log("rendering lecture page", root, indexJson.title);

  const headerElement = e("header", e("h1", indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation, type));

  const subIndexJson = await fetchSubData(type, content);
  const mainElement = e(
    "main",
    e("h2", subIndexJson.title),
    e("div", ...subIndexJson.lectures.map(createLectureHTML(content))),
  );

  const footerElement = e("footer", indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
