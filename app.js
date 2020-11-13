const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.urlencoded({extended:false}));//jsでHTMLのフォームの値を受け取る為に必要な定型文

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'databaseapp'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting:' + err.stack);
    return;
  }
  console.log('success');
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/submit', (req, res) => {
  res.render('submit.ejs');
});


app.listen(3000);
