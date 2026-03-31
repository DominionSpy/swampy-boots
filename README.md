# Swampy Boots

A puzzle browsing application for exploring and creating panel puzzles from [The Witness](https://en.wikipedia.org/wiki/The_Witness_(2016_video_game)).
Built with a modern full-stack architecture using React and Vite on the frontend, Node.js on the backend, and a MongoDB database.

---

## Running with Docker

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Start the app

```bash
docker compose up --build
```

This will spin up four services:

- **mongo** — MongoDB 7 database with a health check
- **seed** — Seeds the database with initial puzzle data (runs once on startup)
- **backend** — Node.js API server
- **frontend** — Vite-built React app

Once running, open your browser and navigate to:

```
http://localhost:5173
```

### Stop the app

```bash
docker compose down
```

To also remove the database volume (wipes all data):

```bash
docker compose down -v
```

---

## Project Structure

```
swampy-boots/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # Reusable UI components (e.g. Thumbnail)
│   │   └── ...
│   ├── Dockerfile
│   └── vite.config.js
├── backend/                # Node.js API server
│   ├── src/
│   └── Dockerfile
├── seed/                   # Database seed scripts and data
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```
