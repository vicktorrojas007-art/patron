const form = document.getElementById("form");
const input = document.getElementById("registro");
const btn = document.getElementById("btn");
const hint = document.getElementById("hint");
const result = document.getElementById("result");

const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function setError(text) {
  hint.textContent = text || "Solo números, sin espacios.";
  hint.classList.toggle("error", Boolean(text));
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const registro = input.value.trim();
  result.innerHTML = "";

  if (!/^[A-Za-z0-9-]{3,20}$/.test(registro)) {
    setError("Escribe entre 3 y 5 dígitos.");
    input.focus();
    return;
  }
  setError("");
  btn.disabled = true;
  btn.textContent = "Buscando…";

  try {
    const res = await fetch("/api/consulta?registro=" + encodeURIComponent(registro));
    const data = await res.json();

    if (res.status === 404) {
      result.innerHTML = '<p class="msg">No encontramos ese número de registro. Revísalo e inténtalo de nuevo.</p>';
    } else if (!res.ok) {
      throw new Error(data.error || "Error");
    } else {
      result.innerHTML = `
        <div class="slip">
          <p class="name">${esc(data.nombre)}</p>
          <p class="reg">Registro ${esc(data.registro)}</p>
          <dl class="fields">
            <div><dt>Mesa</dt><dd>${esc(data.mesa)}</dd></div>
            <div><dt>Recinto</dt><dd>${esc(data.recinto)}</dd></div>
            <div><dt>Aula</dt><dd>${esc(data.aula)}</dd></div>
          </dl>
        </div>`;
    }
  } catch (err) {
    result.innerHTML = '<p class="msg">No pudimos consultar ahora. Inténtalo en unos minutos.</p>';
  } finally {
    btn.disabled = false;
    btn.textContent = "Consultar";
  }
});
