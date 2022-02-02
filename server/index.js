const express = require("express");
const db = require("./models");

const app = express();
const PORT = 3333;

app.use(express.json());

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
