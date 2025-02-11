import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet()); // helmet is a security middleware that helps us protect our app by setting various HTTP headers
app.use(morgan("dev")); //log the requests

app.get('/', (req, res) => {
    res.send("Hello from the backend")
})

app.listen(3000, () => {
    console.log("Server is running on port " + PORT);
});