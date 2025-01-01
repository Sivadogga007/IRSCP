import React, { useState, useEffect } from 'react';
import DiscussionForum from './DiscussionForum';

const AuthForm = () => {
  const [userType, setUserType] = useState('new');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [showDiscussionForum, setShowDiscussionForum] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailid, setEmailID] = useState(null);

  useEffect(() => {
    if (emailid !== null) {
      setShowDiscussionForum(true);
    }
  }, [emailid]);

  const handleGenerateToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate token');
      }

      const data = await response.json();
      setMessage('Token generated. Please check your email.');
      setShowTokenInput(true);
    } catch (error) {
      setMessage('Error: Failed to generate token.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to log in');
      }

      const data = await response.json();
      setMessage('Login successful!');
      setEmailID(data.emailid);
    } catch (error) {
      setMessage('Error: Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, token }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify token');
      }

      const data = await response.json();
      setMessage('Token verified successfully!');
      setEmailID(data.emailid);
    } catch (error) {
      setMessage('Error: Invalid token.');
    } finally {
      setLoading(false);
    }
  };

  const getEmail = () => {
    return emailid;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomain = email.endsWith('@iitb.ac.in');
    return emailRegex.test(email) && validDomain;
  };

  const isFormValid = () => email && password && validateEmail(email);

  return (
    <>
      {showDiscussionForum ? (
        <DiscussionForum getEmail={getEmail} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <form
            onSubmit={userType === 'new' ? handleGenerateToken : handleLogin}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">
              {userType === 'new' ? 'Generate Token' : 'Login'}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">User Type</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="new"
                  name="userType"
                  value="new"
                  checked={userType === 'new'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="new" className="mr-4">New User</label>
                <input
                  type="radio"
                  id="existing"
                  name="userType"
                  value="existing"
                  checked={userType === 'existing'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="existing">Existing User</label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {!validateEmail(email) && email && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid IIT Bombay email (e.g., user@iitb.ac.in).
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 ${
                loading || !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading || !isFormValid()}
            >
              {loading ? 'Processing...' : userType === 'new' ? 'Generate Token' : 'Login'}
            </button>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          </form>

          {showTokenInput && (
            <form onSubmit={handleVerifyToken} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-4">
              <h2 className="text-2xl font-bold mb-4">Verify Token</h2>
              <div className="mb-4">
                <label htmlFor="token" className="block text-gray-700">Token</label>
                <input
                  type="text"
                  id="token"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 ${
                  loading || !token ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading || !token}
              >
                {loading ? 'Verifying...' : 'Verify Token'}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default AuthForm;
