const express = require("express");
const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicle.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();
app.use(express.json());

connectDB();
app.use("/", vehicleRoutes);
app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));