
# Nitish Kumar Singh — Personal Portfolio Website

A responsive, full-stack personal portfolio website created as a B.Tech Bioinformatics project. It showcases my profile, technical skills, projects, and contact information.

## About the Project

This project demonstrates how frontend web technologies can be integrated with a Node.js and Express backend to create a personal portfolio website.

## Technologies Used

- HTML5 — Website structure
- CSS3 — Styling and responsive design
- JavaScript — Interactive functionality
- Node.js — JavaScript runtime
- Express.js — Backend server and API endpoints
- JSON — Simple file-based storage for contact submissions

## Features

- Responsive design for desktop and mobile devices
- Personal introduction and profile section
- Skills and projects showcase
- Contact form with server-side validation
- REST API endpoints
- Health-check endpoint for deployment monitoring
- Simple JSON-based contact message storage

## Project Structure

```text
nitish-bioinformatics-portfolio/
├── index.html
├── styles.css
├── app.js
├── server.js
├── package.json
├── README.md
└── data/
    └── contacts.json (created when a message is submitted)
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Displays the portfolio |
| GET | `/api/health` | Checks server status |
| GET | `/api/projects` | Returns project information |
| POST | `/api/contact` | Accepts contact form submissions |

## Installation and Setup

### Prerequisites

Install Node.js version 20 or later.

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/Nitish-cds/nitish-bioinformatics-portfolio.git
   ```

2. Open the project directory:

   ```bash
   cd nitish-bioinformatics-portfolio
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

## Deployment

The application can be deployed using Render.

1. Connect the GitHub repository to Render.
2. Select **Web Service**.
3. Set the build command to `npm install`.
4. Set the start command to `npm start`.
5. Deploy the application.

Render assigns the application port through the `PORT` environment variable.

## Learning Outcomes

- Understanding frontend and backend integration
- Creating API endpoints with Express.js
- Handling form submissions and validating user input
- Working with JSON-based data storage
- Deploying a Node.js application using GitHub and Render

## Limitations

Contact messages are stored in a local JSON file. On hosting platforms with temporary filesystems, stored messages may be lost after a restart or redeployment. Persistent storage should be configured for production use.

## Author

**Nitish Kumar Singh**

B.Tech Bioinformatics Student

GitHub: [Nitish-cds](https://github.com/Nitish-cds)

## License

This project is intended for educational and portfolio purposes.
