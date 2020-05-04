// Referencia a Módulos Externos
const mongoose = require("mongoose");
const path = require("path");

// Referencia Enrutador
const router = require("express").Router();

// Modelo Tareas
const Tarea = require(path.join(__dirname, "../models/tarea"));

// Ruta Predeterminada - HTTP Get > Request+Response
router.get("/", async (req, res) => {
  // Obtiene TODAS las Tareas
  const tareas = await Tarea.find();

  // Renderiza Página Gestión Tareas
  res.render("main", { tareas });
});

// Ruta Añadir - HTTP POST > /add
router.post("/add", async (req, res) => {
  // Datos Petición > Documento
  const tarea = new Tarea(req.body);

  // Documento > Colección BD
  await tarea.save();

  // Ruta Inicial - Muestra todos los datos
  res.redirect("/");
});

// Ruta Cambiar Estado - HTTP GET > /turn
router.get("/turn/:id", async (req, res) => {
  // Id Tarea a Cambiar Estado
  const id = req.params.id;

  // Cambiar Estado Tarea
  const tarea = await Tarea.findById(id);

  // Cambiar propiedad Estado Tarea
  tarea.estado = !tarea.estado;

  // Guardar tarea
  await tarea.save();

  // Ruta Inicial - Muestra todos los datos
  res.redirect("/");
});

// Ruta Editar Tarea - HTTP GET > /update
router.get("/update/:id", async (req, res) => {
  // Id Tarea a Editar
  const id = req.params.id;

  // Encontrar Tarea a Editar
  const tarea = await Tarea.findById(id);

  // Rederiza Página de Edición de Tarea
  res.render("edit", { tarea });
});

// Ruta Editar Tarea - HTTP POST > /update
router.post("/update/:id", async (req, res) => {
  // Id Tarea a Editar
  const id = req.params.id;

  // Encontrar Tarea a Editar
  mongoose.set("useFindAndModify", false);
  await Tarea.findByIdAndUpdate(id, {$set: req.body});
  mongoose.set("useFindAndModify", true);

  // Ruta Inicial - Muestra todos los datos
  res.redirect("/");
});

// Ruta Borrar - HTTP GET? - Número Item
router.get("/delete/:id", async (req, res) => {
  // Id Tarea a Borrar
  const id = req.params.id;

  // Borrar Tarea
  await Tarea.remove({ _id: id });

  // Ruta Inicial - Muestra todos los datos
  res.redirect("/");
});

// Exportar Enrutador
module.exports = router;
