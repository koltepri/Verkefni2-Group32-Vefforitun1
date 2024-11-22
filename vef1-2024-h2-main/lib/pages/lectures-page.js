import { el as e } from "../elements.js";
import { renderNavigation } from "../components/navigation.js";
import { fetchSubData } from "../fetcher.js";

function createLectureHTML(lecture) {
  return e(
    "div",
    e("h4", {}, lecture.title),
    ...lecture.content.map((lectureItem) => {
      switch (lectureItem.type) {
        case "text":
          return e("p", {}, lectureItem.data);
        case "quote":
          return e("blockquote", {}, e("p", {}, lectureItem.data));
        case "heading":
          return e("h3", {}, lectureItem.data);
        case "list":
          return e(
            "ul",
            {},
            ...lectureItem.data.map((item) => e("li", {}, item)),
          );
        case "code":
          return e("pre", {}, e("code", {}, lectureItem.data));
        case "image":
          return e("img", {
            src: "/data/" + lectureItem.data, // 304 error fix?
            alt: "Lecture image",
            style: "max-width: 100%; height: auto; display: block;",
          });
        default:
          return null;
      }
    }),
  );
}

export async function renderLecturesPage(root, indexJson, type, content) {
  console.log("rendering lecture page", root, indexJson.title);

  const headerElement = e("header", {}, e("h1", {}, indexJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation, type));

  const subIndexJson = await fetchSubData(type, content);
  const mainElement = e(
    "main",
    e("h2", {}, subIndexJson.title),
    e("div", {}, ...subIndexJson.lectures.map(createLectureHTML)),
  );

  const footerElement = e("footer", {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
