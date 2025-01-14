import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { FindWork } from './pages/FindWork';
import { FindTalent } from './pages/FindTalent';
import { MyJobs } from './pages/MyJobs';
import { PostJob } from './pages/PostJob';
import { Profile } from './pages/Profile';
import { AuthCallback } from './pages/AuthCallback';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Header />
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/find-work"
                element={
                  <ProtectedRoute>
                    <Header />
                    <FindWork />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/find-talent"
                element={
                  <ProtectedRoute>
                    <Header />
                    <FindTalent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-jobs"
                element={
                  <ProtectedRoute>
                    <Header />
                    <MyJobs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/post-job"
                element={
                  <ProtectedRoute>
                    <Header />
                    <PostJob />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Header />
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}