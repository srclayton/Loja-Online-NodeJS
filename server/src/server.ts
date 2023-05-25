import fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";

import { itemsRoute } from "./routes/items";
import { categoriesRoute } from "./routes/category";
import { uploadRoute } from "./routes/upload";
import { imagesRoute } from "./routes/images";

const server = fastify();
server.register(cors, {
  origin: true,
});
server.register(multipart);
server.register(uploadRoute);
server.register(itemsRoute);
server.register(categoriesRoute);
server.register(imagesRoute);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
