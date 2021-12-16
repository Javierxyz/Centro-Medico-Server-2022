const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

/**Inicialización del servidor */
const app = express();

/**Configuraciones */
app.set("port", process.env.PORT_SERVER || 5000);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

/**Rutas */
app.use("/api/usuario", require("./routes/usuario"));

/**Levantar el servidor */
app.listen(app.get("port"), () => {
  console.log("Escuchando el servidor desde el puerto: ", app.get("port"));
});
