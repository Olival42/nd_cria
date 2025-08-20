import express from "express";
import clientRouter from "./controller/clientController";
import productRouter from "./controller/productController"
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/clients", clientRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`Servidor rodando.`);
});
