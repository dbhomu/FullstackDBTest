const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mu$abGmai1',  
  database: 'localdb'    
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});


app.post('/submitClient', (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All client fields are required' });
    }
  
    const sql = `
      INSERT INTO clients (username, email, password)
      VALUES (?, ?, ?)
    `;
    const values = [username, email, password];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Client insert error:', err);
        return res.status(500).json({ message: 'Database insert failed' });
      }
      res.json({ message: 'Client saved successfully', id: result.insertId });
    });
  });
  

  app.post('/submitMeeting', (req, res) => {
    const { meeting_topic, number_of_people, meeting_date } = req.body;
  
    if (!meeting_topic || !number_of_people || !meeting_date) {
      return res.status(400).json({ message: 'All meeting fields are required' });
    }
  
    const sql = `
      INSERT INTO meetings (meeting_topic, number_of_people, meeting_date)
      VALUES (?, ?, ?)
    `;
    const values = [meeting_topic, number_of_people, meeting_date];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Meeting insert error:', err);
        return res.status(500).json({ message: 'Database insert failed' });
      }
      res.json({ message: 'Meeting saved successfully', id: result.insertId });
    });
  });
  


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
