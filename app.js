// Referencias Módulos Externos
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

// Referencias Módulos Locales
const routesMgr = require(path.join(__dirname, "routes"));

// Control de Errores
try {
  // Parámetros BD
  const HOST = "localhost";
  const PORT = 27017;
  const BD = "crud-mongo";

  // Enlace BD
  const URL_BD = `mongodb://${HOST}:${PORT}/${BD}`;

  // Mensaje informativo
  console.log("Conectando con BD ...");

  // Conectar BD
  mongoose.connect(URL_BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Activa índices (Deprecation)
  });

  // Mensaje informativo
  console.log("---");
  console.log("Conexión con BD establecida");
  console.log("---");

  // Creción Servidor
  const server = express();

  // Config - Puerto de Escucha
  server.set("puerto", process.env.PORT || 3000);

  // Config - Carpeta de Vistas
  server.set("views", path.join(__dirname, "views"));

  // Config - Motor de Vistas - EJS
  server.set("view engine", "ejs");

  // Middleware - Actividad Usuario > Consola
  server.use(morgan("dev"));

  // Middleware - Formulario HTML - NO Datos binarios
  server.use(express.urlencoded({ extended: false }));

  // Middleware - Archivos Estáticos
  server.use("/", express.static(path.join(__dirname, "public")));

  // Middleware - Gestor de Rutas
  server.use("/", routesMgr);

  // Mensaje informativo
  console.log(`Activando servidor en Puerto ${server.get("puerto")} ...`);

  // Activación Servidor - Puerto de escucha
  server.listen(server.get("puerto"), async () => {
    console.log("---");
    console.log(`Servidor escuchado en Puerto ${server.get("puerto")}`);
    console.log("---");
  });
} catch (error) {
  // console.log(error);
  console.log(error.message);
}
