// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001; // Port for the backend server

// Middleware
app.use(cors()); // Allow requests from your React frontend
app.use(express.json()); // Enable parsing of JSON request bodies

// --- In-Memory Database ---
// This is a simple array to store our posts.
// In a real app, you'd use PostgreSQL or MongoDB.
let posts = [
  {
    id: 1,
    title: 'How do I deploy Node.js on Cloud Run?',
    content: 'I have a Node.js app and I want to deploy it using Google Cloud Run, but I am not sure where to start. Any tips?',
    votes: 5,
    replies: [
      { id: 101, text: 'Use gcloud CLI with region flag' },
      { id: 102, text: 'Enable Cloud Build first!' },
    ],
    author: 'Rohan',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Tailwind CSS vs. Styled-Components?',
    content: 'What are the pros and cons? Our team is debating which one to use for our new project.',
    votes: 12,
    replies: [
      { id: 103, text: 'Tailwind is faster for prototyping!' },
    ],
    author: 'Jane',
    createdAt: new Date(),
  },
];

// --- API Endpoints ---

// GET /posts -> Get all posts
// Sorted by votes (descending) as required
app.get('/posts', (req, res) => {
  const sortedPosts = [...posts].sort((a, b) => b.votes - a.votes);
  res.json(sortedPosts);
});

// POST /posts -> Create post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const newPost = {
    id: Date.now(), // Simple unique ID
    title,
    content,
    votes: 0,
    replies: [],
    author: 'Anonymous', // You can add auth later
    createdAt: new Date(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// GET /posts/:id -> Get single post with replies
// Note: Our GET /posts endpoint already returns replies,
// but this is good practice if you lazy-load data.
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === postId);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// POST /posts/:id/reply -> Add reply
app.post('/posts/:id/reply', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Reply text is required.' });
  }

  const post = posts.find((p) => p.id === postId);

  if (post) {
    const newReply = {
      id: Date.now(),
      text,
    };
    post.replies.push(newReply);
    res.status(201).json(newReply);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// POST /posts/:id/upvote -> Upvote
app.post('/posts/:id/upvote', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === postId);

  if (post) {
    post.votes += 1;
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});