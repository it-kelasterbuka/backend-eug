import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js"
import MahasiswaRoute from "./routes/MahasiswaRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(MahasiswaRoute);

app.listen(3000, ()=> console.log('Server is running...'));