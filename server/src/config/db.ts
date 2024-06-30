import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "taskdb.cv0wo6aqww1c.us-east-2.rds.amazonaws.com",
  database: "taskdb",
  password: ".z=Wi$iDZ8dXL3f",
  port: 5432,
});

export default pool;
