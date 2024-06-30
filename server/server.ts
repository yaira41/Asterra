import express from "express";
import bodyParser from "body-parser";
import hobbiesRoutes from "./src/routes/hobbiesRoutes";
import usersRoutes from "./src/routes/usersRoutes";

const app = express();

app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.use("/hobbies", hobbiesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
