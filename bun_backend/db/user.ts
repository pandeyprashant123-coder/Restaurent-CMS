import Database from "bun:sqlite";
import { userSchema } from "./schema/userSchema";
import { error } from "elysia";

export interface User {
  id?: number;
  fullName: string;
  password: string;
  email: string;
  mobile: string;
  userId: string;
  userType: string;
  dateOfBirth: string;
}

export class userDatabase {
  private db: Database;
  constructor() {
    this.db = new Database("users.db");
    this.init()
      .then(() => console.log("Database initialized"))
      .catch(console.error);
  }

  //add user
  async addUser(user: User) {
    return this.db
      .query(
        `INSERT INTO users 
      (userId, fullName,email,mobile,password,userType,dateOfBirth)
      VALUES (?,?,?,?,?,?,?)
      RETURNING userId
      `
      )
      .get(
        user.userId,
        user.fullName,
        user.email,
        user.mobile,
        user.password,
        user.userType,
        user.dateOfBirth
      ) as User;
  }

  //get user by userId
  async getUserByEmail(email: string) {
    const user = this.db.query(`SELECT * FROM users WHERE email = ?`).get(email) as User;
    return user;
  }

  //initialize the database
  async init() {
    return this.db.run(userSchema);
  }
}
