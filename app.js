const express = require("express");
const app = express();
app.get('/', (req, res) => {
  res.render('top.ejs');
});


app.listen(3000);
