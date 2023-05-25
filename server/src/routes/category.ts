import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";

export async function categoriesRoute(app: FastifyInstance) {
  app.get("/api/v1/categories", async (req, res) => {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    if (!categories)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });
    res.status(200).send(categories);
  });

  app.get("/api/v1/categories/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(req.params);
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });
    res.status(200).send(category);
  });

  app.post("/api/v1/categories", async (req, res) => {
    const bodySchema = z.object({
      name: z.string(),
    });
    const { name } = bodySchema.parse(req.body);

    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).send(category);
  });

  app.put("/api/v1/categories/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(req.params);

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });

    const bodySchema = z.object({
      name: z.string(),
    });
    const { name } = bodySchema.parse(req.body);

    const updatedItem = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });
    res.status(200).send(updatedItem);
  });

  app.delete("/api/v1/categories/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(req.params);
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });

    const deletedItem = await prisma.category.delete({
      where: { id },
    });
    res.send(deletedItem);
  });
}
