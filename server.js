import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATABASE_FILE = path.join(__dirname, 'database.json');

const INITIAL_DATABASE = {
  candidates: [
    { id: 1, name: "BJP (Bharatiya Janata Party)", vote_count: 0 },
    { id: 2, name: "AAP (Aam Aadmi Party)", vote_count: 0 },
    { id: 3, name: "INC (Indian National Congress)", vote_count: 0 },
    { id: 4, name: "NOTA (None of the Above)", vote_count: 0 },
    { id: 5, name: "SP (Samajwadi Party)", vote_count: 0 }
  ],
  voters: [
    { voter_id: "VUP47392", full_name: "Aarav Sharma", phone: "9876543210", email: "aarav.sharma@example.com", is_used: 0, phone_otp: "482910", email_otp: "736251" },
    { voter_id: "VDL81620", full_name: "Isha Patel", phone: "8765432109", email: "isha.patel@example.com", is_used: 0, phone_otp: "193047", email_otp: "528374" },
    { voter_id: "VKA30517", full_name: "Rohan Gupta", phone: "7654321098", email: "rohan.gupta@example.com", is_used: 0, phone_otp: "847362", email_otp: "019283" },
    { voter_id: "VTN92746", full_name: "Meera Nair", phone: "9012345678", email: "meera.nair@example.com", is_used: 0, phone_otp: "571038", email_otp: "294716" },
    { voter_id: "VRJ54803", full_name: "Vikram Singh", phone: "8901234567", email: "vikram.singh@example.com", is_used: 0, phone_otp: "638492", email_otp: "815037" },
    { voter_id: "VWB61938", full_name: "Ananya Das", phone: "7890123456", email: "ananya.das@example.com", is_used: 0, phone_otp: "420185", email_otp: "963574" }
  ],
  users: [],
  votes: []
};

// Read database
function readDb() {
  try {
    if (!fs.existsSync(DATABASE_FILE)) {
      fs.writeFileSync(DATABASE_FILE, JSON.stringify(INITIAL_DATABASE, null, 2), 'utf-8');
      return INITIAL_DATABASE;
    }
    const raw = fs.readFileSync(DATABASE_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database, returning initial:", err);
    return INITIAL_DATABASE;
  }
}

// Write database
function writeDb(data) {
  try {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Error writing database:", err);
    return false;
  }
}

// Init database
readDb();

app.get('/', (req, res) => {
  res.send('<h1>National Electoral Commission — Secure Voting System API</h1><p>Data is stored in <code>database.json</code> at root level.</p>');
});

app.get('/data', (req, res) => {
  res.json(readDb());
});

app.post('/data', (req, res) => {
  const ok = writeDb(req.body);
  if (ok) res.json({ success: true });
  else res.status(500).json({ error: 'Failed to write data to disk' });
});

app.listen(PORT, () => {
  console.log(`Voting System Backend Server running at http://localhost:${PORT}`);
});
