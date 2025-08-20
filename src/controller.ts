import { ClientDto } from "./clientDto";
import { PrismaClient } from "./generated/prisma";
import express, { Request, Response, Router } from "express";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const createClient: ClientDto = req.body;
  try {
    const client = await prisma.client.create({
      data: createClient,
    });
    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar cliente" });
  }
});

router.get("/get", async (req: Request, res: Response) => {
  try {
    const clients = await prisma.client.findMany();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao encontrar os clientes" });
  }
});

export default router;
