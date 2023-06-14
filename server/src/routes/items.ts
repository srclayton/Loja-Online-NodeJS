import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

// todo remove string type declaration

function bodySchema() {
  const schema = z.object({
    name: z.string(),
    categoriesId: z.array(z.string()),
    description: z.string(),
    image: z.array(z.string()),
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
        images: true,
      },
    });
    if (!items)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });
    res.status(200).send(items);
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
      include: {
        categories: true,
        images: true,
      },
    });
    if (!item)
      res.status(404).send({
        statusCode: "404",
        error: "Item not found",
      });
    res.status(200).send(item);
  });

  app.post("/api/v1/items", async (req, res) => {
    const iBodySchema = bodySchema();

    const {
      name,
      categoriesId,
      description,
      image,
      price,
      hasDiscount,
      discountPercentage,
      discountValue,
      discountedValue,
      quantity,
    } = iBodySchema.parse(req.body);
    const categoriesSchema: any = [];
    categoriesId.forEach((element) => {
      categoriesSchema.push({ id: element });
    });
    const imageSchema: any = [];
    image.forEach((element) => {
      imageSchema.push({ id: element });
    });

    const item = await prisma.item.create({
      data: {
        name,
        categories: {
          connect: categoriesSchema,
        },
        description,
        images: { connect: imageSchema },
        price,
        hasDiscount,
        discountPercentage,
        discountValue,
        discountedValue,
        quantity,
      },
      include: {
        categories: true,
        images: true,
      },
    });
    res.status(201).send(item);
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
      categoriesId,
      description,
      image,
      price,
      hasDiscount,
      discountPercentage,
      discountValue,
      discountedValue,
      quantity,
    } = iBodySchema.parse(req.body);
    const categoriesSchema: any = [];
    categoriesId.forEach((element) => {
      categoriesSchema.push({ id: element });
    });
    const imageSchema: any = [];
    image.forEach((element) => {
      imageSchema.push({ id: element });
    });
    const updatedItem = await prisma.item.update({
      where: {
        id,
      },
      data: {
        name,
        categories: {
          set: categoriesSchema,
        },
        description,
        images: { set: imageSchema },
        price,
        hasDiscount,
        discountPercentage,
        discountValue,
        discountedValue,
        quantity,
      },
      include: {
        categories: true,
        images: true,
      },
    });

    res.status(200).send(updatedItem);
  });
}
