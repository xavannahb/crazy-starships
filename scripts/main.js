const svg = document.querySelector("svg");
const paths = Array.from(svg.querySelectorAll("path")).slice(0, 8);
const container = document.querySelector(".dots");

const starsPerPath = 1;
const duration = 2000; // in ms

paths.forEach((path, k) => {
  const d = path.getAttribute("d");

  for (let i = 0; i < starsPerPath; i++) {
    const star = document.createElement("div");
    star.className = "star";

    for (let j = 0; j < 20; j++) {
      const dot = document.createElement("div");
      dot.className = "dot";

      const size = 10 - j * 0.4; // taper from 10px to 2px

      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.offsetPath = `path('${d}')`;

      /*  The delay depends on:
      - i: each spiral has equally spaced stars
      - j: each star has a number of trailing dots with a small delay
      - k: each spiral is slightly out of face with the others
      */
      const delay =
        ((i / starsPerPath) * duration) / 1000 + j * 0.0075 + k * 0.25;

      dot.style.setProperty("--delay", `${delay}s`);
      dot.style.setProperty("--duration", `${duration}ms`);

      star.appendChild(dot);
    }

    container.append(star);
  }
});

// Students
const studentsPerPath = 1;
const studentDuration = 5000; // in ms

paths.forEach((path, k) => {
  const d = path.getAttribute("d");

  if (k % 2 === 0) return;

  for (let i = 0; i < studentsPerPath; i++) {
    const student = document.createElement("div");
    student.className = "student";

    for (let j = 0; j < 40; j++) {
      const dot = document.createElement("div");
      dot.className = "dot";

      const size = 40 - j * 0.8; // taper from 10px to 2px

      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.offsetPath = `path('${d}')`;

      /*  The delay depends on:
      - i: each spiral has equally spaced stars
      - j: each star has a number of trailing dots with a small delay
      - k: each spiral is slightly out of face with the others
      */
      const delay =
        ((i / (starsPerPath + 2)) * duration) / 1000 + j * 0.0075 + k * 0.37;

      dot.style.setProperty("--delay", `${delay}s`);
      dot.style.setProperty("--duration", `${studentDuration}ms`);

      student.appendChild(dot);
    }

    container.append(student);
  }
});

const studentImages = [
  ["student1.jpg", "Yoda"],
  ["student2.jpg", "Spock"],
  ["student3.jpg", "E.T"],
  ["student4.jpeg", "Elon Musk"],
];

function getRandomStudent() {
  return studentImages[Math.floor(Math.random() * studentImages.length)];
}

document.querySelectorAll(".student .dot:first-of-type").forEach((dot) => {
  const student = getRandomStudent();

  dot.style.backgroundImage = `url(../media/${student[0]})`;
  dot.style.setProperty("--label", `"${student[1]}"`);

  dot.addEventListener("animationiteration", () => {
    const student = getRandomStudent();

    dot.style.backgroundImage = `url(../media/${student[0]})`;
    dot.style.setProperty("--label", `"${student[1]}"`);
  });
});

// EASTER EGG BLACK HOLE
// from cyd stumpel
const zwartGat = document.querySelector(".hole");
const opslokbaar = Array.from(
  document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, ul, ol, img, video"),
);

const staggerDuration = 1000;

// from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
shuffle(opslokbaar);

// from cyd stumpel
if (zwartGat) {
  zwartGat.addEventListener("click", () => {
    const activeElement = opslokbaar[0];
    animateToBlackHole(activeElement);
  });
}

const animateToBlackHole = (activeElement) => {
  if (document.startViewTransition) {
    const transition = document.startViewTransition(() => {
      activeElement.classList.add("gets-sucked");
    });
    transition.finished.then(() => {
      activeElement.remove();
      opslokbaar.shift();
      if (opslokbaar.length) {
        const nextEl = opslokbaar[0];
        animateToBlackHole(nextEl);
      }
    });
  }
};

let section = document.querySelector("section");

let sectionT = section.offsetTop;
let sectionL = section.offsetLeft;

let zwartGatT = zwartGat.offsetTop;
let zwartGatL = zwartGat.offsetLeft;

console.log("hole: " + zwartGatT + ", " + zwartGatL);
console.log("section: " + sectionT + ", " + sectionL);
