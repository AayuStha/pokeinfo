import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import PokemonDetail from './components/PokemonDetail';
import Login from './components/Login'; 
import Dashboard from './components/Dashboard';

// A higher-order component to protect certain routes (like Dashboard or PokemonDetail) from unauthorized access
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />; // If authenticated renders child components else navigate to login page
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokemon/:id"
          element={
            <ProtectedRoute>
              <PokemonDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;