import { renderSubpage } from "./lib/pages/sub-page.js";
import { renderIndexPage } from "./lib/pages/index-page.js";
import { renderKeywordsPage } from "./lib/pages/keywords-page.js";
import { renderLecturesPage } from "./lib/pages/lectures-page.js";
import { renderQuizPage } from "./lib/pages/quiz-page.js";
import { fetcher } from "./lib/fetcher.js";
import "bootstrap/dist/css/bootstrap.min.css";

async function render(root, querystring) {
  const indexJson = await fetcher("/data/index.json");

  const params = new URLSearchParams(querystring);
  const type = params.get("type");
  const content = params.get("content");
  // console.log(type);
  // console.log(content);

  if (!type) {
    await renderIndexPage(root, indexJson);
  } else if (content === "keywords") {
    await renderKeywordsPage(root, indexJson, type, content);
  } else if (content === "lectures") {
    await renderLecturesPage(root, indexJson, type, content);
  } else if (content === "questions") {
    await renderQuizPage(root, indexJson, type, content);
  } else {
    await renderSubpage(root, indexJson, type);
  }
}

const root = document.querySelector("#app");

render(root, window.location.search);
