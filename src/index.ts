import express from "express";
const { swaggerUi, swaggerDocs } = require("./config/swagger");
import clientRouter from "./controller/clientController";
import productRouter from "./controller/productController"
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json());

// Middleware do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/clients", clientRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Swagger rodando em http://localhost:3000/api-docs");
});
