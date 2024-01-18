const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./db/index");
const cors = require("cors");
const productRouter = require("./routes/product.routes");

const app = express();
// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Homepage");
});

// routes declaration
app.use("/api/v1/products", productRouter);

app.listen(PORT, console.log(`Server has started on PORT: ${PORT}`));
