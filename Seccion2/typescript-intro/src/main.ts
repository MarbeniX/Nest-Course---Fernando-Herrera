import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { name, age, isStudent, templateString } from "./bases/01-types.ts";
import { pokemonIds } from "./bases/02-objects.ts";
import { pokemons } from "./bases/03-arrays.ts";
import { charmander } from "./bases/05-injection.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <h2>Nombre: ${name}, Edad: ${age}, ¿Es estudiante?: ${isStudent}</h2>
    <pre>${templateString}</pre>
    <pre>${pokemonIds.join(",")}</pre>
    <pre>${JSON.stringify(pokemons)}</pre>
    <pre>${JSON.stringify(charmander)}</pre>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
