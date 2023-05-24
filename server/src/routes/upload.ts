import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import admin from "firebase-admin";

import * as serviceAccount from "../config/my-first-project-66dfc-firebase-adminsdk-28p20-122ae4d4f2.json";
import { randomUUID } from "crypto";
import { extname } from "path";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: "gs://my-first-project-66dfc.appspot.com/",
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

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        reply.send({
          message: "Imagem enviada com sucesso",
          id: fileId,
          fileName,
          imageUrl: publicUrl,
        });
      } catch (error) {
        reply.code(500).send({ message: "Erro ao enviar a imagem", error });
      }
    }
  );
}
