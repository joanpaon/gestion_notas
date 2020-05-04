// Referencias Modulos Externos
const mongoose = require("mongoose");

// Definición de Exquema
const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: false
  },
});

// Compilación Modelo
const Tarea = mongoose.model("tareas", tareaSchema);

// Exportación Modelo
module.exports = Tarea;
