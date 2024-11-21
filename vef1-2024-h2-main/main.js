import { fetcher, fetchSubData } from "./lib/fetcher.js";
import { renderContentPage } from "./lib/pages/content-page.js";
import { renderIndexPage } from "./lib/pages/index-page.js";
import { renderSubpage } from "./lib/pages/sub-page.js";
import { renderLecturePage } from "./lib/pages/namsefni-page.js";

async function render(root, querystring) {
  const indexJson = await fetcher("data/index.json");

  const params = new URLSearchParams(querystring);
  const type = params.get("type");
  const content = params.get("content");

  console.log(type, content);

  if (!type) {
    await renderIndexPage(root, indexJson);
  } else if (content === "keywords") {
    await renderKeywordsPage(root, indexJson, type, content);
  } else if (content === "lectures") {
    await renderLecturePage(root, indexJson, type, content);
  } else if (content === "questions") {
    await renderQuestionsPage(root, indexJson, type, content);
  } else {
    await renderSubpage(root, indexJson, type);
  }
}

const root = document.querySelector("#app");

render(root, window.location.search);
