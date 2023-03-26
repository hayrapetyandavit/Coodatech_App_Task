import dotenv from "dotenv";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import cors from "cors";

import User from "./models/user.model";
import Card from "./models/card.model";
import Column from "./models/column.model";
import File from "./models/file.model";

import authRouter from "./routes/auth.router";
import columnRouter from "./routes/column.router";
import cardRouter from "./routes/card.router";
import fileRouter from "./routes/file.router";

import { roles } from "./models/user.model";

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
};

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3011;

authRouter(app);
columnRouter(app);
cardRouter(app);
fileRouter(app);

const main = async () => {
  try {
    await User.sync({ force: false }).then(() => initial());

    console.log("Database synchronized");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

async function initial() {
  try {
    await User.sync({ force: false });
    await Card.sync({ force: false });
    await Column.sync({ force: false });
    await File.sync({ force: false });

    const password = "Qw!1qwerty";
    const name = "Admin";
    const email = "admin@gmail.com";
    const data = {
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: roles.ADMIN,
    };

    await User.create(data);
  } catch (error: any) {
    console.log(error.message, "error");
  }
}

main();

export default app;