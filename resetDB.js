const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database(':memory:');


db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS profiles (
    userId TEXT PRIMARY KEY,
    bio TEXT,
    visibility TEXT,
    role TEXT
  )`);

    db.all('SELECT * FROM profiles ', (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
        }
        console.log('Profiles:');
        rows.forEach(row => {
            console.log(row);
        });
    });
});

// Close the database connection
db.close();
