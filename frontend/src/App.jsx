// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the API base URL
const API_URL = 'http://localhost:3001'; // Your backend URL

// --- Main App Component ---
function App() {
  const [posts, setPosts] = useState([]);

  // Fetch all posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data); // API returns posts sorted by votes
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // --- Event Handlers ---

  const handleCreatePost = async (title, content) => {
    try {
      const response = await axios.post(`${API_URL}/posts`, { title, content });
      // Add the new post to the top of the list
      setPosts([response.data, ...posts]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpvote = async (postId) => {
    try {
      await axios.post(`${API_URL}/posts/${postId}/upvote`);
      // Re-fetch posts to get updated order and counts
      fetchPosts(); 
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const handleAddReply = async (postId, replyText) => {
    try {
      await axios.post(`${API_URL}/posts/${postId}/reply`, { text: replyText });
      // Re-fetch posts to get updated replies
      fetchPosts(); 
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Learnato Discussion Forum</h1>
          <p className="text-gray-600 mt-1">Empower learning through conversation.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Column: Create Post --- */}
        <div className="lg:col-span-1">
          <PostForm onSubmit={handleCreatePost} />
        </div>

        {/* --- Right Column: Post List --- */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Discussions</h2>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onUpvote={handleUpvote}
              onAddReply={handleAddReply}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

// --- PostForm Component ---
function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please enter both a title and content.');
      return;
    }
    onSubmit(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md sticky top-8">
      <h3 className="text-xl font-semibold mb-4">Create a New Post</h3>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Question / Insight</label>
        <textarea
          id="content"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-semibold"
      >
        Post
      </button>
    </form>
  );
}

// --- PostItem Component ---
function PostItem({ post, onUpvote, onAddReply }) {
  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText) return;
    onAddReply(post.id, replyText);
    setReplyText('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
        <p className="text-gray-600 mt-2">{post.content}</p>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>Posted by: {post.author}</span>
          <span
            className="cursor-pointer hover:text-blue-600"
            onClick={() => setShowReplies(!showReplies)}
          >
            {post.replies.length} Replies
          </span>
        </div>
      </div>

      {/* --- Replies Section (Togglable) --- */}
      {showReplies && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <h4 className="text-md font-semibold mb-2">Replies:</h4>
          <div className="space-y-3 mb-4">
            {post.replies.length > 0 ? (
              post.replies.map((reply) => (
                <p key={reply.id} className="bg-gray-200 p-2 rounded-md text-sm">
                  {reply.text}
                </p>
              ))
            ) : (
              <p className="text-sm text-gray-500">No replies yet.</p>
            )}
          </div>
          {/* Add Reply Form */}
          <form onSubmit={handleReplySubmit} className="flex gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Add your reply..."
              className="flex-grow p-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="submit"
              className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 text-sm"
            >
              Reply
            </button>
          </form>
        </div>
      )}

      {/* --- Footer Actions --- */}
      <div className="bg-white px-6 py-3 border-t border-gray-200">
        <button
          onClick={() => onUpvote(post.id)}
          className="bg-blue-100 text-blue-700 py-2 px-4 rounded-full font-semibold hover:bg-blue-200"
        >
          ▲ Upvote ({post.votes})
        </button>
      </div>
    </div>
  );
}

export default App;