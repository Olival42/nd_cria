import express from "express";
import clientRoutes from "./routes/clientRoutes";
import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/products", productRoutes);

app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;