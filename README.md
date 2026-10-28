# Nitish Kumar Singh — Personal Portfolio Website

A responsive full-stack personal portfolio built with HTML, CSS, JavaScript, Node.js, Express, and SQLite. Designed for a B.Tech Bioinformatics student and suitable as a learning project submission.

## Features
- Responsive design for mobile and desktop
- About, skills, projects, and contact sections
- Express backend with `/api/health`, `/api/projects`, and `/api/contact` endpoints
- SQLite database stores contact messages in `portfolio.db`
- Form validation on both client and server
- Accessible labels, mobile navigation, and reduced-motion support

## Run locally
Requires Node.js 18 or later.

```bash
npm install
npm start
```

Open http://localhost:3000. The database is created automatically on first run.

## API routes
- `GET /api/health` — confirms the server is running
- `GET /api/projects` — returns sample project data as JSON
- `POST /api/contact` — validates and stores a contact message

Example request:
```json
{
  "name": "Aditi Sharma",
  "email": "aditi@example.com",
  "message": "Hello! I would like to connect."
}
```

## Before submitting
1. Replace the sample name or text if your own details differ.
2. Run `npm install` and `npm start`, then test the site on desktop and mobile.
3. Test the contact form using a sample message.
4. If a public URL is required, deploy the project to a Node.js host that supports persistent storage, or use a managed database. Do not claim it is live until you deploy and test it.
5. Add screenshots and a short explanation of what you built to your submission if the platform permits.

## Portfolio honesty note
The DNA Sequence Explorer and Gene Expression Notes are presented as learning concepts, not as completed scientific research. Update the project descriptions as you complete real work.
