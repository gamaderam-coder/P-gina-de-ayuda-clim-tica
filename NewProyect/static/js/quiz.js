// ---------- Preguntas del test de hábitos ----------
// score: 0 = mejor hábito, 3 = mayor impacto/margen de mejora
const QUESTIONS = [
  {
    q: "¿Cómo te mueves normalmente?",
    options: [
      { label: "A pie o en bici", score: 0 },
      { label: "Transporte público", score: 1 },
      { label: "Coche compartido", score: 2 },
      { label: "Coche propio", score: 3 },
    ],
  },
  {
    q: "¿Qué energía usas en casa?",
    options: [
      { label: "Renovable", score: 0 },
      { label: "Mixta", score: 1 },
      { label: "No lo sé", score: 2 },
      { label: "Convencional", score: 3 },
    ],
  },
  {
    q: "¿Con qué frecuencia comes carne roja?",
    options: [
      { label: "Nunca", score: 0 },
      { label: "1–2 veces por semana", score: 1 },
      { label: "Casi a diario", score: 2 },
      { label: "A diario", score: 3 },
    ],
  },
  {
    q: "¿Cómo sueles comprar ropa?",
    options: [
      { label: "Segunda mano", score: 0 },
      { label: "Marcas sostenibles", score: 1 },
      { label: "En rebajas", score: 2 },
      { label: "Compra impulsiva", score: 3 },
    ],
  },
  {
    q: "¿Reciclas en casa?",
    options: [
      { label: "Siempre", score: 0 },
      { label: "A veces", score: 1 },
      { label: "Rara vez", score: 2 },
      { label: "Nunca", score: 3 },
    ],
  },
  {
    q: "¿Cuánto duran tus duchas?",
    options: [
      { label: "Menos de 5 min", score: 0 },
      { label: "5–10 min", score: 1 },
      { label: "10–15 min", score: 2 },
      { label: "Más de 15 min", score: 3 },
    ],
  },
  {
    q: "¿Compras productos locales o de temporada?",
    options: [
      { label: "Siempre", score: 0 },
      { label: "A menudo", score: 1 },
      { label: "A veces", score: 2 },
      { label: "Casi nunca", score: 3 },
    ],
  },
  {
    q: "¿Cada cuánto cambias de móvil?",
    options: [
      { label: "Más de 4 años", score: 0 },
      { label: "2–4 años", score: 1 },
      { label: "1–2 años", score: 2 },
      { label: "Cada año", score: 3 },
    ],
  },
  {
    q: "¿Cómo viajas en vacaciones?",
    options: [
      { label: "Tren o bus", score: 0 },
      { label: "Coche", score: 1 },
      { label: "Avión, trayecto corto", score: 2 },
      { label: "Avión, trayecto largo", score: 3 },
    ],
  },
  {
    q: "¿Hablas con otros sobre el cambio climático?",
    options: [
      { label: "Siempre", score: 0 },
      { label: "A veces", score: 1 },
      { label: "Rara vez", score: 2 },
      { label: "Nunca", score: 3 },
    ],
  },
];

// ---------- Resultados por rango de puntaje (máx 30) ----------
const RESULTS = [
  {
    max: 7,
    title: "Eres un",
    accent: "eco-guardián",
    text: "Tus hábitos ya tienen un impacto muy bajo. Sigue así y comparte lo que sabes: tu ejemplo también cuenta.",
  },
  {
    max: 15,
    title: "Vas en",
    accent: "buena dirección",
    text: "Tienes varios hábitos sólidos. Con un par de ajustes pequeños —transporte o consumo— puedes reducir aún más tu huella.",
  },
  {
    max: 23,
    title: "Este es tu",
    accent: "punto de partida",
    text: "Hay margen real de mejora en varias áreas. No hace falta cambiarlo todo a la vez: elige un hábito y empieza esta semana.",
  },
  {
    max: 30,
    title: "Es momento de",
    accent: "actuar",
    text: "Tu huella actual es alta, pero los cambios más simples suelen ser los de mayor impacto. Empieza por uno solo, hoy.",
  },
];

// ---------- Estado ----------
let current = 0;
const answers = new Array(QUESTIONS.length).fill(null);

const progressEl = document.getElementById("progress");
const qMarkEl = document.getElementById("qMark");
const qTextEl = document.getElementById("qText");
const qOptionsEl = document.getElementById("qOptions");
const btnBack = document.getElementById("btnBack");
const btnNext = document.getElementById("btnNext");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");

function renderProgress() {
  progressEl.innerHTML = "";
  QUESTIONS.forEach((_, i) => {
    const seg = document.createElement("div");
    seg.className = "seg";
    if (i < current) seg.classList.add("done");
    if (i === current) seg.classList.add("active");
    progressEl.appendChild(seg);
  });
}

function renderQuestion() {
  const item = QUESTIONS[current];
  qMarkEl.textContent = `PREGUNTA ${current + 1} / ${QUESTIONS.length}`;
  qTextEl.textContent = item.q;
  qOptionsEl.innerHTML = "";

  item.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "q-option";
    if (answers[current] === i) btn.classList.add("selected");
    btn.innerHTML = `<span class="bullet"></span><span>${opt.label}</span>`;
    btn.addEventListener("click", () => selectOption(i));
    qOptionsEl.appendChild(btn);
  });

  btnBack.disabled = current === 0;
  btnNext.disabled = answers[current] === null;
  btnNext.textContent = current === QUESTIONS.length - 1 ? "Ver resultado" : "Siguiente";

  renderProgress();
}

function selectOption(i) {
  answers[current] = i;
  renderQuestion();
}

function goNext() {
  if (answers[current] === null) return;
  if (current < QUESTIONS.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (current === 0) return;
  current--;
  renderQuestion();
}

function showResult() {
  const total = answers.reduce((sum, ansIndex, qi) => {
    return sum + QUESTIONS[qi].options[ansIndex].score;
  }, 0);
  const maxScore = QUESTIONS.length * 3;
  const tier = RESULTS.find((r) => total <= r.max);

  document.getElementById("resultTitle").innerHTML =
    `${tier.title} <span class="accent">${tier.accent}</span>`;
  document.getElementById("resultText").textContent = tier.text;

  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");

  // animar barra tras el siguiente frame para que la transición se vea
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById("resultBar").style.width =
        `${(total / maxScore) * 100}%`;
    });
  });
}

function restart() {
  current = 0;
  answers.fill(null);
  resultCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  document.getElementById("resultBar").style.width = "0%";
  renderQuestion();
}

btnNext.addEventListener("click", goNext);
btnBack.addEventListener("click", goBack);
document.getElementById("btnRestart").addEventListener("click", restart);

renderQuestion();