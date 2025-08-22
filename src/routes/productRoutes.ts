import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createProductSchema, updateProductSchema } from "../validations/productValidation";
import * as productController from "../controllers/productController";

const router = Router();

router.post("/", validate(createProductSchema), productController.createProduct);

router.get("/", productController.getProducts);

router.get("/:id", productController.getById);

router.delete("/:id", productController.deleteById);

router.put("/:id", validate(updateProductSchema), productController.update);

export default router;