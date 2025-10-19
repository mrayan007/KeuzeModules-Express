import "dotenv/config";

import cors from "cors";
import express from "express";
import ModuleRouter from "./src/Interface/Routes/ModuleRouter";
import AuthRouter from "./src/Interface/Routes/AuthRouter"
import FavoritesRouter from "./src/Interface/Routes/FavoritesRouter"
import { MongoDB } from "./src/Infrastructure/Database/connect";
import cookieParser from "cookie-parser";

import type { Express} from "express";

const app : Express = express();
const port : string | string = process.env.PORT || "3000";

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.REACT_URL,
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use('/modules', ModuleRouter);
app.use('/auth', AuthRouter);
app.use('/favorite', FavoritesRouter);

app.listen(port, (): void => {
    console.log(`The server is listening on http://localhost:${port}`);
});

MongoDB(process.env.MONGO_DB);