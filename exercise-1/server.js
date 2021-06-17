const express = require("express");
const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("../index.html");
// });

app.use("/", express.static("app"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
