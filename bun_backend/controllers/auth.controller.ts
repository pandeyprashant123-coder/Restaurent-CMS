import { Elysia, t } from "elysia";
import { User, userDatabase } from "../db/user";
import { randomUUIDv7 } from "bun";
import { jwt } from "@elysiajs/jwt";

export const authController = new Elysia()
  .decorate("db", new userDatabase())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
      exp: "7d",
    })
  )
  .post(
    "/register",
    async ({ body, set, db, jwt }) => {
      const {
        mobile,
        date_of_birth,
        password,
        confirm_password,
        email,
        fullName,
      } = body;
      const user_type = "user";
      const testEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!testEmail) {
        throw new Error("Invalid email format");
      }
      //confirm password match
      if (password !== confirm_password) {
        set.status = 400;
        return "password don't match";
      }
      const hashedPasswd = await Bun.password.hash(password, {
        algorithm: "bcrypt",
      });
      const userId = randomUUIDv7();
      const user = {
        mobile,
        password: hashedPasswd,
        dateOfBirth: date_of_birth,
        email,
        fullName,
        userType: user_type,
        userId,
      };
      try {
        //check if user already exists
        const existingUser = await db.getUserByEmail(email);
        if (existingUser) {
          set.status = 400;
          return "user already exists";
        }
        const newUser = await db.addUser(user);
        const token = await jwt.sign({
          id: newUser.userId,
          userType: user_type,
        });
        return {
          success: true,
          token,
        };
      } catch (error) {
        set.status = 500;
        return error;
      }
    },
    {
      body: t.Object({
        email: t.String(),
        mobile: t.String(),
        password: t.String(),
        confirm_password: t.String(),
        fullName: t.String(),
        date_of_birth: t.String(),
      }),
    }
  )
  .post(
    "/login",
    async ({ body, db, set, jwt }) => {
      const { email, password } = body;
      try {
        const user: User | null = await db.getUserByEmail(email);
        if (!user) {
          set.status = 400;
          return "user is not present";
        }
        const isMatch = await Bun.password.verify(password, user?.password);
        if (!isMatch) {
          set.status = 400;
          return "invalid credentials";
        }
        const token = await jwt.sign({
          userId: user.userId,
          userType: user.userType,
        });
        return {
          success: true,
          token,
        };
      } catch (error) {
        set.status = 500;
        return error;
      }
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    }
  );
