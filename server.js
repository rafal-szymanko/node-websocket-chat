const express = require('express');
const app = express();
const port = 8000;
const path = require('path');



app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });