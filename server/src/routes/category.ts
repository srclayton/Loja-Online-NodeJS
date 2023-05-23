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
    res.send(categories);
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
        statusCode: 404,
        error: "Category not found",
      });

    res.send(category);
  });
}
