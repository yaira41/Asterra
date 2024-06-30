import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "taskdb.cv0wo6aqww1c.us-east-2.rds.amazonaws.com",
  database: "taskdb",
  password: "bMk26FPvmyH8VxU",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
