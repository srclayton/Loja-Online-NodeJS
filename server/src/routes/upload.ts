import { FastifyInstance } from "fastify";

const admin = require("firebase-admin");
const serviceAccount = require("../config/my-first-project-66dfc-firebase-adminsdk-28p20-122ae4d4f2.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function uploadRoute(app: FastifyInstance) {
  app.post("/api/v1/upload", async () => {
    return { msg: "ola" };
  });
}
