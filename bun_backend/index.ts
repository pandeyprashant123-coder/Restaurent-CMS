import Elysia from "elysia";
import cors from "@elysiajs/cors";
import { hookSetup } from "./startup/hooks";
import { authController } from "./controllers/auth.controller";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
const apiRoute = "/api";
const PORT = process.env.PORT || 8000;
export const app = new Elysia();

app
  .use(cors(corsOptions))
  .use(hookSetup)
  .get("/", () => "hello bun.ts")
  .group(`${apiRoute}/v1`, (app) => app.use(authController))
  .listen(PORT, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
  });
