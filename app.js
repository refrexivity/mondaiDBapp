const express = require('express');
const mysql = require('mysql');


const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));//jsでHTMLのフォームの値を受け取る為に必要な定型文

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '*PhoLinG29',
  database: 'databaseapp',
  multipleStatements: true
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

app.post('/show', (req, res) => {
  connection.query(
    'SELECT * from printdata',
    (error, results) => {
      // console.log("OK?");
      res.render('submit.ejs', {printdata: results});
      // console.log(results[0].maintext);
    }
  );
});

// app.post('/show2/:id', (req, res) => {
//   connection.query(
//     'select * from printdata',
//     'select * from mondaidb where midcode = ?',
//      [req.params.midcode],
//      (error, results) => {
//        console.log(results[0]);
//        console.log(results[1]);
//      }
//   );
// });

app.post('/show2/:midcode', (req, res) => {
  console.log(req.params.midcode);
  connection.query(
    'SELECT * from mondaidb where midcode = ?',
    [req.params.midcode],
    (error, results) => {
      // console.log(results);
      res.render('submit2.ejs', {mondaidb: results});
      // console.log(results.length);
      // for (let i = 0; i <= results.length; i++ ) {
      //   console.log(results[i].name);
      // }

  // next()
// }, (req, res) => {
//   res.render('submit.ejs');
  });
});



app.listen(3000);
