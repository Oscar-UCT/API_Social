require('dotenv').config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require('./middleware/errorHandler');

const app = express();
connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());

console.log("Montando rutas");
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => res.send("API funcionando"));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Servidor funcionando en puerto ${PORT}`));