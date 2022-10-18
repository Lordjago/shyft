//import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { } from'colors';
dotenv.config({path: "./config/.env"})

//Import routes
import route from "./routes/index.js"
import errorHandler from "./middleware/errorHandler.js";

const app = express();
//Mount Middlewares
app.use(cors());

//Mount Routers
app.use(route);
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.italic.underline.cyan); 
});
