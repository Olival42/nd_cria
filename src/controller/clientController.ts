import { createClient, getClients, get, update, deleteById } from "../service/clientService";
import { CreateClientDto } from "../dto/ClientDto/CreateClientDto";
import { UpdateClientDto } from "../dto/ClientDto/UpdateClientDto";
import { validate } from "class-validator";
import { Router, Request, Response } from "express";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: João da Silva
 *         email:
 *           type: string
 *           example: joao@email.com
 *         cpf:
 *           type: string
 *           example: 12345678901
 *         phone:
 *           type: string
 *           example: 11987654321
 *     CreateClientDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - cpf
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           example: João da Silva
 *         email:
 *           type: string
 *           example: joao@email.com
 *         cpf:
 *           type: string
 *           example: 12345678901
 *         phone:
 *           type: string
 *           example: 11987654321
 *     UpdateClientDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Maria Oliveira
 *         email:
 *           type: string
 *           example: maria@email.com
 *         cpf:
 *           type: string
 *           example: 98765432100
 *         phone:
 *           type: string
 *           example: 11999998888
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Rotas de gerenciamento de clientes
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Criar um novo cliente
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientDto'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Erros de validação
 */
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

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Listar todos os clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const clients = await getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar os clientes" });
  }
});

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 */
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

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Atualizar cliente por ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClientDto'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 */
router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const clientDto = Object.assign(new UpdateClientDto(), req.body);
  const erros = await validate(clientDto, { skipMissingProperties: true });

  if (erros.length > 0) {
    const errosFromatados = erros
      .filter(e => Object.keys(req.body).includes(e.property))
      .map(e => ({
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

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Deletar cliente por ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
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
