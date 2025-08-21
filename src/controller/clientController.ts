import { createClient, getClients, get, update, deleteById } from "../service/clientService";
import { CreateClientDto } from "../dto/ClientDto/CreateClientDto";
import express, { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { UpdateClientDto } from "../dto/ClientDto/UpdateClientDto";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const clientDto = Object.assign(new CreateClientDto(), req.body);
  const erros = await validate(clientDto);

  if (erros.length > 0) {
    const errosFromatados = erros.map(e => ({
      campo: e.property,
      mensagens: Object.values(e.constraints || {})
    }));
    return res.status(400).json(errosFromatados);
  }

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
    res.status(500).json({ message: "Erro ao buscar o cliente." });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const clientDto = Object.assign(new UpdateClientDto(), req.body);
  const erros = await validate(clientDto, { skipMissingProperties: true });
  // skipMissingProperties: true -> ignora campos que não foram enviados

  if (erros.length > 0) {
    const errosFromatados = erros.filter(e => (
      Object.keys(req.body).includes(e.property)
    )).map(e => ({
      campo: e.property,
      mensagens: Object.values(e.constraints || {})
    }));
    return res.status(400).json(errosFromatados);
  }

  try {
    const client = await update(id, clientDto);
    res.status(200).json(client);
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    res.status(500).json({ message: "Erro ao atualizar o cliente." });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await deleteById(id);
    res.status(200).json({ message: "Cliente excluido com sucesso." });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    res.status(500).json({ message: "Erro ao deletar o cliente" });
  }
});

export default router;
