const express = require ('express');
const app = express ();

app.get ('/', function (req, res) {
  res.send ('Hello World');
});

app.listen (3001);
app.post ('/update', (res, req) => {});
