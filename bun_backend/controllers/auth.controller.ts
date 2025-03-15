import Elysia from "elysia";

export const authController = new Elysia().get("/register", () => {
  const message = "hi";
  return message;
});
