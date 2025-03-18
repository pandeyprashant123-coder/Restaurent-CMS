export const userSchema = `
CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      userId TEXT NOT NULL,
      fullName TEXT NOT NULL, 
      mobile TEXT NOT NULL, 
      email TEXT NOT NULL,
      password TEXT NOT NULL, 
      userType TEXT  CHECK (userType IN ('user','vendor','admin')) NOT NULL DEFAULT 'user',
      dateOfBirth TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    updated_at TEXT NOT NULL DEFAULT current_timestamp
      )
`;
