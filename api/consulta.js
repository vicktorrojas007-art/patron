const path = require("path");
const Database = require("better-sqlite3");

const db = new Database(path.join(process.cwd(), "data", "padron.db"), {
  readonly: true,
});
const buscar = db.prepare(
  "SELECT registro, nombre, mesa, recinto, aula FROM padron WHERE registro = ?"
);

module.exports = (req, res) => {
  const registro = String(req.query.registro || "").trim();

  if (!/^\d{5,15}$/.test(registro)) {
    return res.status(400).json({ error: "Registro inválido" });
  }

  const fila = buscar.get(registro);
  if (!fila) return res.status(404).json({ error: "No encontrado" });

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json(fila);
};
