import { createClient, getClients, get } from "./service";
import { CreateClientDto } from "./clientDto";
import express, { Request, Response, Router } from "express";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const clientDto: CreateClientDto = req.body;
  try {
    const client = await createClient(clientDto);
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar cliente" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const clients = await getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar os clientes" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const client = await get(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente não foi encontrado." });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar o cliente" });
  }
});

export default router;
