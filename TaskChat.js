import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskChat = ({ taskTitle }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  const handleSendComment = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      text: commentInput,
      time: new Date().toLocaleTimeString(),
    };
    setComments([...comments, newComment]);
    setCommentInput('');

    toast.success("Comment sent successfully!");

  };

  return (
    <div className="card p-3 mt-3">
      <h5 className="mb-3">Comments for: <strong>{taskTitle}</strong></h5>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="chat-box border p-2 mb-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {comments.length === 0 ? (
          <p className="text-muted">No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="mb-2">
              <span className="fw-bold">User:</span> {comment.text}
              <div className="text-muted small">{comment.time}</div>
            </div>
          ))
        )}
      </div>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Write a comment..."
        />
        <button className="btn btn-primary" onClick={handleSendComment}>Send</button>
      </div>
    </div>
  );
};

export default TaskChat;
