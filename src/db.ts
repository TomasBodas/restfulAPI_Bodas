import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "rodolfo",
  host: "localhost",
  port: 5432,
  database: "pafin",
});

export default pool;
