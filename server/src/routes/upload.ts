import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import admin from "firebase-admin";

import * as serviceAccount from "../config/my-first-project-66dfc-firebase-adminsdk-28p20-122ae4d4f2.json";
import { randomUUID } from "crypto";
import { extname } from "path";
import { z } from "zod";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});
const bucket = admin.storage().bucket();

export async function uploadRoute(app: FastifyInstance) {
  app.post(
    "/api/v1/upload",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = await request.saveRequestFiles({
          limits: {
            fileSize: 1024 * 1024 * 5, // 5MB
          },
        });
        if (!data) return reply.status(400).send();
        const mimeTypeRegex = /(image)\/[a-zA-Z]+/;
        const isValidesFileFormat = mimeTypeRegex.test(data[0].mimetype);
        if (!isValidesFileFormat)
          return reply.status(400).send({
            statusCode: "400",
            error: "Incompatible file format",
            mimeType: data[0].mimetype,
          });
        const filePath = data[0]?.filepath;
        const fileId = randomUUID();
        const extension = extname(data[0]?.filename);
        const fileName = fileId.concat(extension);
        await bucket.upload(filePath, {
          destination: fileName,
          resumable: false,
          metadata: {
            contentType: data[0]?.mimetype,
          },
        });
        const [files] = await bucket.getFiles();
        const file = files.find((file) => file.name === fileName);
        // @ts-ignore
        const [signedUrl] = await file.getSignedUrl({
          action: "read",
          expires: "01-01-2124", // Data de expiração opcional
        });
        reply.send({
          message: "Imagem enviada com sucesso",
          id: fileId,
          name: fileName,
          contentType: data[0]?.mimetype,
          imageUrl: signedUrl,
        });
      } catch (error) {
        reply.code(500).send({ message: "Erro ao enviar a imagem", error });
      }
    }
  );
  app.delete(
    "/api/v1/upload/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      });
      const bodySchema = z.object({
        contentType: z.string(),
      });
      const { id } = paramsSchema.parse(request.params);
      const { contentType } = bodySchema.parse(request.body);
      const extension = ".".concat(contentType.split("/")[1]);
      const [files] = await bucket.getFiles();
      const file = files.find((file) => file.name === id.concat(extension));
      // reply.send(file);
      // @ts-ignore
      const deletedImage = await file?.delete();
      reply.send(deletedImage);
    }
  );
}
