import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success("Login successful!");
    setTimeout(() => {
      onAuthSuccess(); 
    }, 1000);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    toast.success("Signup successful!");
    setTimeout(() => {
      onAuthSuccess(); 
    }, 1000);
  };

  return (
    <div className="card shadow p-4 w-100 mx-auto" style={{ maxWidth: '400px' }}>
      <div className="d-flex justify-content-around mb-4">
        <button
          className={`btn ${isLogin ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`btn ${!isLogin ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <form onSubmit={handleLogin}>
          <h3 className="text-center mb-3">Login</h3>
          <input type="email" className="form-control mb-3" placeholder="Email" required />
          <input type="password" className="form-control mb-3" placeholder="Password" required />
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <h3 className="text-center mb-3">Sign Up</h3>
          <input type="text" className="form-control mb-3" placeholder="Username" required />
          <input type="email" className="form-control mb-3" placeholder="Email" required />
          <input type="password" className="form-control mb-3" placeholder="Password" required />
          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
