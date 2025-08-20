import express from "express";
import clientRouter from "./controller";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/clients", clientRouter);

app.listen(port, () => {
  console.log(`Servidor rodando.`);
});
