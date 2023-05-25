import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";

function bodySchema() {
  const schema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    contentType: z.string(),
    imageUrl: z.string(),
  });

  return schema;
}
export async function imagesRoute(app: FastifyInstance) {
  app.get("/api/v1/images", async (req, res) => {
    const image = await prisma.image.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    if (!image)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });
    res.status(200).send(image);
  });

  app.get("/api/v1/images/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(req.params);
    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    });
    if (!image)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });
    res.status(200).send(image);
  });

  app.post("/api/v1/images", async (req, res) => {
    const iBodySchema = bodySchema();
    const { id, name, contentType, imageUrl } = iBodySchema.parse(req.body);

    const category = await prisma.image.create({
      data: {
        id,
        name,
        contentType,
        imageUrl,
      },
    });
    res.status(201).send(category);
  });

  app.delete("/api/v1/images/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(req.params);
    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (!image)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });

    const deletedItem = await prisma.image.delete({
      where: { id },
    });
    res.send(deletedItem);
  });
}
