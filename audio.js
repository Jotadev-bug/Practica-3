/* Música de fondo: suena en bucle en todas las páginas y continúa al navegar */

const musica = new Audio("audio/shop_3.mp3");
musica.loop = true;
musica.volume = 0.4;

// Recupera por dónde iba la canción en la página anterior
const guardado = parseFloat(sessionStorage.getItem("musica-tiempo"));
if (!isNaN(guardado)) musica.currentTime = guardado;
let silenciada = sessionStorage.getItem("musica-silenciada") === "1";

const botonMusica = document.createElement("button");
botonMusica.className = "boton-musica";
botonMusica.type = "button";

function actualizarBoton() {
  botonMusica.textContent = silenciada ? "🔇" : "🔊";
  botonMusica.setAttribute(
    "aria-label",
    silenciada ? "Activar música" : "Silenciar música"
  );
}

function reproducir() {
  if (!silenciada) musica.play().catch(() => {});
}

botonMusica.addEventListener("click", (e) => {
  e.stopPropagation();
  silenciada = !silenciada;
  sessionStorage.setItem("musica-silenciada", silenciada ? "1" : "0");
  silenciada ? musica.pause() : musica.play();
  actualizarBoton();
});

// Los navegadores bloquean el sonido automático hasta que el usuario interactúa
function alInteractuar() {
  reproducir();
  ["click", "keydown", "touchstart"].forEach((ev) =>
    document.removeEventListener(ev, alInteractuar)
  );
}
["click", "keydown", "touchstart"].forEach((ev) =>
  document.addEventListener(ev, alInteractuar)
);

window.addEventListener("pagehide", () => {
  sessionStorage.setItem("musica-tiempo", musica.currentTime);
});

document.addEventListener("DOMContentLoaded", () => {
  actualizarBoton();
  document.body.appendChild(botonMusica);
  reproducir();
});
