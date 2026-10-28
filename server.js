const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;
const db = new Database(process.env.DB_PATH || path.join(__dirname, 'portfolio.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', app: 'Nitish Portfolio API' }));

app.get('/api/projects', (_req, res) => {
  res.json([
    { title: 'DNA Sequence Explorer', category: 'Bioinformatics', description: 'A learning project concept for exploring DNA sequences, GC content, and nucleotide counts.', tags: ['DNA', 'Python', 'Sequence Analysis'] },
    { title: 'Student Portfolio Website', category: 'Web Development', description: 'A responsive portfolio with a contact form backed by an Express API and SQLite database.', tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'] },
    { title: 'Gene Expression Notes', category: 'Computational Biology', description: 'A structured study resource covering gene expression, RNA analysis, and genomics fundamentals.', tags: ['RNA', 'Genomics', 'Research'] }
  ]);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body || {};
  if (![name, email, message].every(v => typeof v === 'string' && v.trim())) {
    return res.status(400).json({ error: 'Please complete all fields.' });
  }
  if (name.trim().length > 80 || email.trim().length > 160 || message.trim().length > 2000) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  const insert = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
  const result = insert.run(name.trim(), email.trim(), message.trim());
  res.status(201).json({ success: true, id: result.lastInsertRowid, message: 'Thanks! Your message has been saved.' });
});

app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
