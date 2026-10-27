const form = document.getElementById("form-comentario");
const statusElement = document.getElementById("comentario-status");
const commentsContainer = document.getElementById("lista-comentarios");
const averageElement = document.getElementById("media-comentarios");
const sortSelect = document.getElementById("ordenacao-comentarios");
let comments = [];

function getRating(comment) {
  const rating = Number(comment.nota);
  return Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : null;
}

function makeElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function addRefreshState(message, buttonLabel) {
  commentsContainer.replaceChildren();
  const state = makeElement("div", "comment-state empty-feed");
  state.append(makeElement("p", "", message));
  const refreshButton = makeElement("button", "button comment-refresh", buttonLabel);
  refreshButton.type = "button";
  refreshButton.addEventListener("click", loadComments);
  state.append(refreshButton);
  commentsContainer.append(state);
}

function renderComments() {
  commentsContainer.replaceChildren();

  if (comments.length === 0) {
    averageElement.textContent = "Média: —";
    addRefreshState("Ainda não há comentários cadastrados. Seja o primeiro a avaliar o filme!", "Atualizar lista");
    return;
  }

  const ratedComments = comments.filter((comment) => getRating(comment) !== null);
  const average = ratedComments.length
    ? ratedComments.reduce((sum, comment) => sum + getRating(comment), 0) / ratedComments.length
    : null;
  averageElement.textContent = average === null
    ? `Sem avaliações · ${comments.length} ${comments.length === 1 ? "comentário" : "comentários"}`
    : `Média ${average.toFixed(1)} / 5 · ${comments.length} ${comments.length === 1 ? "comentário" : "comentários"}`;

  const sortedComments = [...comments].sort((first, second) => {
    if (sortSelect.value === "melhores") {
      return (getRating(second) || 0) - (getRating(first) || 0);
    }
    return new Date(second.data_criacao || 0) - new Date(first.data_criacao || 0);
  });

  sortedComments.forEach((comment) => {
    const item = document.createElement("article");
    item.className = "comment-item comment-card";

    const heading = makeElement("div", "comment-card-heading comment-card-header");
    const avatar = makeElement("span", "comment-avatar", (comment.nome || "?").trim().charAt(0).toUpperCase() || "?");
    avatar.setAttribute("aria-hidden", "true");

    const authorDetails = makeElement("div", "comment-author");
    authorDetails.append(makeElement("h3", "", comment.nome || "Fã"));
    const createdAt = new Date(comment.data_criacao);
    const formattedDate = Number.isNaN(createdAt.getTime())
      ? "Data não disponível"
      : new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(createdAt);
    authorDetails.append(makeElement("time", "comment-date", formattedDate));

    const rating = getRating(comment);
    const stars = makeElement(
      "span",
      "comment-stars comment-rating",
      rating === null ? "Sem nota" : `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`,
    );
    if (rating !== null) stars.setAttribute("aria-label", `Nota ${rating} de 5`);
    heading.append(avatar, authorDetails, stars);

    const message = makeElement("p", "comment-message comment-text", comment.mensagem || "");
    item.append(heading, message);
    commentsContainer.append(item);
  });
}

async function loadComments() {
  commentsContainer.setAttribute("aria-busy", "true");
  try {
    const response = await fetch("/api/comentarios");
    if (!response.ok) throw new Error(`Falha ao carregar comentários (HTTP ${response.status}).`);

    const result = await response.json();
    if (!Array.isArray(result)) throw new Error("A resposta do servidor tem um formato inválido.");

    comments = result;
    renderComments();
  } catch (error) {
    console.error("Não foi possível carregar os comentários:", error);
    averageElement.textContent = "Média indisponível";
    addRefreshState("Não foi possível carregar os comentários agora. Verifique a conexão e tente novamente.", "Tentar novamente");
  } finally {
    commentsContainer.setAttribute("aria-busy", "false");
  }
}

sortSelect.addEventListener("change", renderComments);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusElement.textContent = "";

  const formData = new FormData(form);
  const comment = {
    nome: formData.get("nome"),
    email: formData.get("email"),
    nota: Number(formData.get("nota")),
    mensagem: formData.get("mensagem"),
  };

  let response;
  try {
    response = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
  } catch (error) {
    console.error("Não foi possível enviar o comentário:", error);
    statusElement.textContent = "Não foi possível enviar o comentário agora. Verifique a conexão e tente novamente.";
    return;
  }

  if (!response.ok) {
    statusElement.textContent = "Não foi possível enviar o comentário. Tente novamente.";
    return;
  }

  form.reset();
  statusElement.textContent = "Comentário enviado com sucesso.";
  await loadComments();
});

loadComments();
