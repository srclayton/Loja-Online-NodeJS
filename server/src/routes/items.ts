import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

function bodySchema() {
  const schema = z.object({
    name: z.string(),
    categories: z.string(),
    description: z.string(),
    imageUrls: z.string(),
    price: z.number(),
    hasDiscount: z.boolean().default(false),
    discountPercentage: z.string().nullable(),
    discountValue: z.number().nullable(),
    discountedValue: z.number().nullable(),
    quantity: z.number(),
  });

  return schema;
}
export async function itemsRoute(app: FastifyInstance) {
  app.get("/api/v1/items", async (req, res) => {
    const items = await prisma.item.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        categories: true,
      },
    });
    res.send(items);
  });

  app.get("/api/v1/items/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);
    const item = await prisma.item.findUnique({
      where: {
        id,
      },
    });
    if (item) res.send(item);
    else
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });
  });

  app.post("/api/v1/items", async (req, res) => {
    const iBodySchema = bodySchema();
    const {
      name,
      categories,
      description,
      imageUrls,
      price,
      hasDiscount,
      discountPercentage,
      discountValue,
      discountedValue,
      quantity,
    } = iBodySchema.parse(req.body);

    const item = await prisma.item.create({
      data: {
        name, // @ts-ignore
        categories,
        description,
        imageUrls,
        price,
        hasDiscount, // @ts-ignore
        discountPercentage, // @ts-ignore
        discountValue, // @ts-ignore
        discountedValue,
        quantity,
      },
    });
    res.send(item);
  });

  app.delete("/api/v1/items/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(req.params);
    const item = await prisma.item.findUnique({
      where: {
        id,
      },
    });
    if (!item)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });
    await prisma.item.delete({
      where: {
        id,
      },
    });
    res.send(item);
  });

  app.put("/api/v1/items/:id", async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(req.params);

    const item = await prisma.item.findUnique({
      where: {
        id,
      },
    });

    if (!item)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });

    const iBodySchema = bodySchema();
    const {
      name,
      categories,
      description,
      imageUrls,
      price,
      hasDiscount,
      discountPercentage,
      discountValue,
      discountedValue,
      quantity,
    } = iBodySchema.parse(req.body);

    const updatedItem = await prisma.item.update({
      where: {
        id,
      },
      data: {
        name, // @ts-ignore
        categories,
        description,
        imageUrls,
        price,
        hasDiscount, // @ts-ignore
        discountPercentage, // @ts-ignore
        discountValue, // @ts-ignore
        discountedValue,
        quantity,
      },
    });

    res.send(updatedItem);
  });
}
