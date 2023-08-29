// Load environment variables from a .env file
require("dotenv").config();

// Import necessary libraries and modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db";

// Retrieve the PRIVATE_KEY from environment variables
const { PRIVATE_KEY } = process.env;

// Define the structure of a User object
interface User {
  id: number;
  password(password: string): void;
}

// Define the structure for SET clauses in the update query
interface SetClause {
  field: string;
  value: string | null;
}

// A class to handle user-related operations
export default class UserService {
  // Generate a JWT token for a given user
  static generateToken(user: User): string {
    return jwt.sign({ userId: user.id }, PRIVATE_KEY as string, { expiresIn: "1h" });
  }

  // Create a new user and store their information in the database
  static async createUser(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    return newUser.rows[0];
  }

  // Retrieve a user by their email from the database
  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return user.rows[0] || null;
  }

  // Retrieve all users from the database
  static async getAllUsers(): Promise<User[]> {
    const allUsers = await pool.query("SELECT * FROM users");
    return allUsers.rows;
  }

  // Retrieve a user by their ID from the database
  static async getUserById(id: number): Promise<User | null> {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return user.rows[0] || null;
  }

  // Update a user's information in the database
  static async updateUser(
    id: number,
    name: string | null,
    email: string | null,
    password: string | null
  ): Promise<string> {
    const setClauses: SetClause[] = [];
    const values: (string | number | null)[] = [];
    let valueIndex = 1; // Start with 1 for the id placeholder

    // Construct SET clauses based on provided parameters
    if (name !== null) {
      setClauses.push({ field: "name", value: name });
      values.push(name);
    }
    if (email !== null) {
      setClauses.push({ field: "email", value: email });
      values.push(email);
    }
    if (password !== null) {
      setClauses.push({ field: "password", value: password });
      values.push(password);
    }

    // Check for valid parameters to update
    if (setClauses.length === 0) {
      throw new Error("No valid parameters provided for update.");
    }

    // Construct and execute the update query
    const setClause = setClauses
      .map((clause) => `${clause.field} = $${valueIndex++}`)
      .join(", ");

    values.push(id);

    const queryString = `UPDATE users SET ${setClause} WHERE id = $${valueIndex++}`;

    await pool.query(queryString, values);
    return "User information updated successfully!";
  }

  // Delete a user from the database
  static async deleteUser(id: number): Promise<void> {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
  }
}
