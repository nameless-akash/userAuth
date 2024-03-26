const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');
db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS profiles (
    userId TEXT PRIMARY KEY,
    bio TEXT,
    visibility TEXT
    role TEXT
  )`);
});

const getUserProfile = async (userId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM profiles WHERE userId = ?', [userId], (err, row) => {
            if (err) {
                reject(new Error(`Failed to fetch user profile: ${err.message}`));
            } else {
                resolve(row);
            }
        });
    });
};

const updateProfileVisibility = async (userId, visibility) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT userId FROM profiles WHERE userId = ?', [userId], (err, row) => {
            if (err) {
                reject(new Error(`Failed to check user profile: ${err.message}`));
            } else if (!row) {
                reject(new Error(`User profile with ID ${userId} does not exist`));
            } else {
                db.run(
                    'UPDATE profiles SET visibility = ? WHERE userId = ?',
                    [visibility, userId],
                    function (err) {
                        if (err) {
                            reject(new Error(`Failed to update profile visibility: ${err.message}`));
                        } else {
                            // Fetch the updated profile
                            db.get('SELECT * FROM profiles WHERE userId = ?', [userId], (err, updatedProfile) => {
                                if (err) {
                                    reject(new Error(`Failed to fetch updated profile: ${err.message}`));
                                } else {
                                    resolve(updatedProfile);
                                }
                            });
                        }
                    }
                );
            }
        });
    });
};



const addUserProfile = async (userId, bio, visibility, role) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO profiles (userId, bio, visibility, role) VALUES (?, ?, ?, ?)',
            [userId, bio, visibility, role],
            function (err) {
                if (err) {
                    reject(new Error(`Failed to add user profile: ${err.message}`));
                } else {
                    resolve({ userId, bio, visibility, role });
                }
            }
        );
    });
};

module.exports = {
    getUserProfile,
    updateProfileVisibility,
    addUserProfile,
};
