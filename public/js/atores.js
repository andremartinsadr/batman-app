document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-ator");
  const closeButton = modal?.querySelector(".close-modal-ator");
  const photo = document.getElementById("ator-foto");
  const name = document.getElementById("ator-nome");
  const character = document.getElementById("ator-personagem");
  const biography = document.getElementById("ator-bio-personagem");
  const quote = document.getElementById("ator-citacao");
  const cards = document.querySelectorAll(".actor-cards-container .card");

  if (!modal || !closeButton || !photo || !name || !character || !biography || !quote || cards.length === 0) {
    return;
  }

  const actorDetails = {
    pattinson: {
      name: "Robert Pattinson",
      character: "Bruce Wayne / Batman",
      photo: "./images/batman-em-gotham.webp",
      biography: "Bruce Wayne está em seu segundo ano como o vigilante de Gotham. Ele é uma figura sombria, visceral e movida pela vingança, ainda aprendendo a equilibrar a raiva pessoal com seu papel de protetor da cidade.",
      quote: '"Queríamos criar um Batman que parecesse quebrado, imperfeito e desesperado. Ele não tem controle total de suas emoções ainda; está apenas no início de sua jornada."',
    },
    kravitz: {
      name: "Zoë Kravitz",
      character: "Selina Kyle / Mulher-Gato",
      photo: "./images/catwoman.jpg",
      biography: "Selina Kyle é uma garçonete e ladra habilidosa do Iceberg Lounge. Ela cruza o caminho do Batman enquanto procura por sua amiga desaparecida, revelando uma química complexa entre os dois.",
      quote: '"Tentei focar no lado humano e vulnerável de Selina. Ela é uma sobrevivente em uma cidade implacável, lutando por aqueles que o sistema esqueceu."',
    },
    wright: {
      name: "Jeffrey Wright",
      character: "James Gordon",
      photo: "./images/james-gordon-galeria.png",
      biography: "O tenente James Gordon é um dos poucos policiais não corruptos do Departamento de Polícia de Gotham City (GCPD). Ele forma uma aliança de confiança com o Batman para solucionar os crimes enigmáticos do Charada.",
      quote: '"Gordon e o Batman compartilham um compromisso comum com a justiça em uma cidade onde a moralidade foi completamente destruída."',
    },
  };

  let triggerCard;

  function openModal(card, details) {
    triggerCard = card;
    name.textContent = details.name;
    character.textContent = details.character;
    biography.textContent = details.biography;
    quote.textContent = details.quote;
    photo.style.backgroundImage = `url("${details.photo}")`;
    photo.setAttribute("aria-label", `Imagem de ${details.name} como ${details.character}`);
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    closeButton.focus();
  }

  function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    triggerCard?.focus();
  }

  cards.forEach((card) => {
    const details = actorDetails[card.dataset.ator];
    if (!details) return;

    card.addEventListener("click", () => openModal(card, details));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(card, details);
      }
    });
  });

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "flex") closeModal();
  });
});
