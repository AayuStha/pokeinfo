import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Sparkles } from 'lucide-react'; 

const Login: React.FC = () => {
 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  // Handle form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 

    const validUsername = import.meta.env.VITE_USERNAME; 
    const validPassword = import.meta.env.VITE_PASSWORD;

    // Validate the username and password entered by the user
    if (username === validUsername && password === validPassword) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard'); 
    } else {
      setError('Invalid credentials'); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-800 to-purple-900 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`, // Random size for each twinkle
                height: `${Math.random() * 3 + 1}px`,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite`, // Random animation timing
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-md w-full backdrop-blur-sm bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-2xl mb-4 rotate-45 transform hover:rotate-0 transition-transform duration-300">
            <Sparkles className="w-10 h-10 text-indigo-600 -rotate-45" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Trainer</h1>
          <p className="text-indigo-200 mt-2">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-indigo-500/20 text-indigo-200 p-3 rounded-lg text-sm text-center border border-indigo-500/30">
              {error} 
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-indigo-200 mb-2">
              Username
            </label>
            <input
              id="username" 
              type="text"
              value={username} // Bind the value to the state
              onChange={(e) => setUsername(e.target.value)} // Update state on input change
              className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white placeholder-indigo-300/50"
              placeholder="Enter your username"
              required 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-indigo-200 mb-2">
              Password
            </label>
            <input
              id="password" 
              type="password"
              value={password} // Bind the value to the state
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-white placeholder-indigo-300/50"
              placeholder="Enter your password"
              required 
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-medium shadow-lg shadow-indigo-500/30"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-indigo-200">
          Demo credentials: admin / pokemon123
        </p>
      </div>
    </div>
  );
};

export default Login; 