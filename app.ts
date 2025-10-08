import "dotenv/config";

import cors from "cors";
import express from "express";
import ModuleRouter from "./src/Interface/Routes/ModuleRouter";
import { MongoDB } from "./src/Infrastructure/Database/connect";

import type { Express } from "express";

const app : Express = express();
const port : string | string = process.env.PORT || "3000";

app.use(cors({
  origin: process.env.REACT_URL,
  methods: ["GET"],
  credentials: true
}));

app.get('/', (request, response): void => {
    response.send("Hello World");
});

app.use('/modules', ModuleRouter);

app.listen(port, (): void => {
    console.log(`The server is listening on http://localhost:${port}`);
});

MongoDB(process.env.MONGO_DB);