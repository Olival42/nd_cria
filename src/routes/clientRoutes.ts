import { Router } from "express";
import * as clientController from "../controllers/clientController";
import { validate } from "../middlewares/validate";
import { createClientSchema, updateClientSchema } from "../validations/clientValidation";

const router = Router();

router.post("/", validate(createClientSchema), clientController.createClient);

router.get("/", clientController.getClients);

router.get("/:id", clientController.getById);

router.delete("/:id", clientController.deleteById);

router.put("/:id", validate(updateClientSchema), clientController.update)

export default router;