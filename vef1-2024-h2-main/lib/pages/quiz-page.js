import { el as e } from "../elements.js";
import { renderNavigation } from "../components/navigation.js";
import { fetchSubData } from "../fetcher.js";

function createQuizHTML(quiz) {
  return e(
    "div",
    { class: "card mb-4" },
    e(
      "div",
      { class: "card-body" },
      e("h4", { class: "text-primary" }, quiz.question),
      e(
        "div",
        { class: "list-group" },
        ...quiz.answers.map((answer) => {
          const button = e("button", {
            class: "list-group-item list-group-item-action",
          });

          button.addEventListener("click", () => {
            if (answer.correct) {
              button.classList.add("list-group-item-success");
            } else {
              button.classList.add("list-group-item-danger");
            }
          });

          button.textContent = answer.answer;
          return button;
        }),
      ),
    ),
  );
}
export async function renderQuizPage(root, indexJson, type, content) {
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
      ...subIndexJson.questions.map((quiz) =>
        e("div", { class: "col-md-6" }, createQuizHTML(quiz)),
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
