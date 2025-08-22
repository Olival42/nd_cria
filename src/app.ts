import express from "express";
import clientRoutes from "./routes/clientRoutes";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

export default app;