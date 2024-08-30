import express from "express"
import { configDotenv } from "dotenv"; //
import todoRoute from "./routes/todoRoute.js"
import { errorHandler } from "./middleware/errorHandler.js";

configDotenv();
const app = express();


const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/todos', todoRoute);
app.use(errorHandler);

app.listen(PORT,()=>{ //create note
  console.log(`Server running at port: ${PORT}`);
})