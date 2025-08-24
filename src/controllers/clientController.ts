import * as clientService from "../services/clientService";
import { NextFunction, Request, Response } from "express";

export async function createClient(req: Request, res: Response, next: NextFunction) {

  try {
    const client = await clientService.createClient(req.body);
    return res.status(201).json(client);
  } catch (error) {
    next(error);
  }
}

export async function getClients(req: Request, res: Response, next: NextFunction) {

  try {
    const clients = await clientService.getClients();
    return res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {

  try {
    const id = parseInt(req.params.id);
    const client = await clientService.getById(id);

    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
}

export async function deleteById(req: Request, res: Response, next: NextFunction) {

  try {
    const id = parseInt(req.params.id);
    const client = await clientService.deleteById(id);

    return res.status(200).json(client);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {

  try {
    const id = parseInt(req.params.id);
    await clientService.update(id, req.body);

    return res.status(200).json({ message: "Cliente excluído com sucesso." });
  } catch (error) {
    next(error);
  }
}