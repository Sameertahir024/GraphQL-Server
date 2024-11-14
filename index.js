import express from "express";
const app = express();
import { config } from "dotenv";
config();
import connect from "./config/db.js";
import { ApolloServer } from "@apollo/server";
import EmpTypeDefs from "./schema/EmpTypeDefs.js";
import EmployeeResolver from "./resolvers/EmployeeResolver.js";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
app.use(cors());
const PORT = process.env.PORT;
connect();
app.use(express.json());
const server = new ApolloServer({
  typeDefs: EmpTypeDefs,
  resolvers: EmployeeResolver,
});

const startServer = async () => {
  await server.start();
  app.use("/graphql", expressMiddleware(server));
};
app.get("/", (req, res) => {
  res.json({ "server is running": true });
});

startServer();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT} `);
});
