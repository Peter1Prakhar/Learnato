# Learnato Hackathon - Discussion Forum

This project is a microservice-based discussion forum built for the Learnato Hackathon. The theme is "Empower learning through conversation."

It features a fast, real-time-ready forum where users can post questions, add replies, and upvote content.

**Live Demo:** [Link to your deployed URL]

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express |
| Database | In-memory Array (MVP) |
| Deployment | Docker, Docker Compose |

## Core Features

- [x] **Create Post:** Add a new question or topic.
- [x] **List Posts:** View all posts, sorted by upvotes.
- [x] **View Post & Replies:** Click a post to see its replies.
- [x] **Add Reply:** Add a reply beneath a post.
- [x] **Upvote Post:** Increment vote count for a post.
- [x] **Responsive UI:** Works on desktop and mobile.

## Local Setup (Docker)

This is the recommended way to run the project.

1.  Clone the repository.
2.  Ensure you have Docker Desktop running.
3.  From the project root, run:
    ```bash
    docker-compose up --build
    ```
4.  Open your browser:
    * **Frontend:** `http://localhost`
    * **Backend API:** `http://localhost:3001`

## Local Setup (Without Docker)

**1. Run Backend:**
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:3001
