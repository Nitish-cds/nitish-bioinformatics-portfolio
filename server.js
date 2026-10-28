

const express = require("express");
const path = require("path");
const fs = require("fs/promises");

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// Serve the portfolio's frontend files.
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/styles.css", (_req, res) => {
  res.sendFile(path.join(__dirname, "styles.css"));
});

app.get("/app.js", (_req, res) => {
  res.sendFile(path.join(__dirname, "app.js"));
});

// Health check for Render.
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Portfolio server is running"
  });
});

// Portfolio projects.
app.get("/api/projects", (_req, res) => {
  res.json([
    {
      title: "Personal Portfolio Website",
      description:
        "A responsive portfolio showcasing my skills and projects.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express"]
    },
    {
      title: "Bioinformatics Learning",
      description:
        "Exploring computational biology, biological data and sequence analysis.",
      technologies: ["Bioinformatics", "Biology", "Data Analysis"]
    }
  ]);
});

// Save contact form submissions to a JSON file.
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, email and message."
      });
    }

    await fs.mkdir(DATA_DIR, { recursive: true });

    let contacts = [];

    try {
      const contents = await fs.readFile(CONTACTS_FILE, "utf8");
      contacts = JSON.parse(contents);

      if (!Array.isArray(contacts)) {
        contacts = [];
      }
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    contacts.push({
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 254),
      message: message.trim().slice(0, 5000),
      receivedAt: new Date().toISOString()
    });

    await fs.writeFile(
      CONTACTS_FILE,
      JSON.stringify(contacts, null, 2),
      "utf8"
    );

    return res.status(201).json({
      success: true,
      message: "Your message has been received."
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to save your message right now."
    });
  }
});

// Handle unknown API routes.
app.use("/api", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found."
  });
});

// Start the server.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio server running on port ${PORT}`);
});
