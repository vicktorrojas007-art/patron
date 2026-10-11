// Función serverless de Vercel: el padrón NO se envía al navegador,
// solo se devuelve el registro que coincide exactamente.
const padron = require("../data/padron.json");

module.exports = (req, res) => {
  const registro = String(req.query.registro || "").trim();

  if (!/^\d{5,15}$/.test(registro)) {
    return res.status(400).json({ error: "Registro inválido" });
  }

  const fila = padron.find((p) => p.registro === registro);
  if (!fila) return res.status(404).json({ error: "No encontrado" });

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json(fila);
};
