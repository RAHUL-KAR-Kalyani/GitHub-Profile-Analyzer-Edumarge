const express = require("express");

const profileRoutes = require("./routes/profileRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "GitHub Profile Analyzer API"
    });
});

app.use("/api/profiles", profileRoutes);

app.use(errorHandler);

module.exports = app;