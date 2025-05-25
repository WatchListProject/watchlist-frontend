import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Iniciando servidor...");

const distPath = path.join(__dirname, "dist");
console.log("Ruta a dist:", distPath);

try {
  const files = fs.readdirSync(distPath);
  console.log("Archivos en dist:", files);
} catch (err) {
  console.error("Error al leer dist:", err);
}

app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
