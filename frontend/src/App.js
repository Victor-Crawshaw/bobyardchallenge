// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://127.0.0.1:8000/api/comments/';

function App() {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentData = {
      author: 'Admin',
      text: newCommentText,
      likes: 0,
      image: null
    };
    axios.post(API_URL, commentData)
      .then(response => {
        setComments([response.data, ...comments]);
        setNewCommentText('');
      })
      .catch(error => {
        console.error('Error posting comment:', error);
      });
  };

  const handleDeleteComment = (id) => {
    axios.delete(`${API_URL}${id}/`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== id));
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleUpdateComment = (id, newText) => {
    axios.patch(`${API_URL}${id}/`, { text: newText })
      .then(response => {
        setComments(comments.map(c => c.id === id ? response.data : c));
        setEditingComment(null);
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
  };

  return (
    <div className="container">
      <h1>Comments</h1>

      <form onSubmit={handleAddComment} className="comment-form">
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Add a new comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>

      <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment.id} className="comment">
            <div className="comment-avatar">
              {comment.image ? (
                <img src={comment.image} alt={comment.author} />
              ) : (
                <div className="placeholder-avatar">No Image</div>
              )}
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <div>
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">
                    {' · '}
                    {new Date(comment.date).toLocaleString()}
                  </span>
                </div>
                <div className="comment-actions">
                  <button onClick={() => setEditingComment({ id: comment.id, text: comment.text })}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                </div>
              </div>

              {editingComment && editingComment.id === comment.id ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateComment(comment.id, editingComment.text);
                }} className="mt-2">
                  <input
                    type="text"
                    className="edit-input"
                    value={editingComment.text}
                    onChange={(e) => setEditingComment({ ...editingComment, text: e.target.value })}
                    autoFocus
                  />
                </form>
              ) : (
                <p className="comment-text">{comment.text}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;