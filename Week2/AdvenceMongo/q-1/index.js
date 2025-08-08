const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/userAddressDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error: ", err));

app.use("/", userRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});