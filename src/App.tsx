import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { AuthGuard } from './components/Auth/AuthGuard';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Subscription } from './pages/Subscription';
import { Profile } from './pages/Profile';
import { CreateDeepfake } from './pages/CreateDeepfake';
import { SharedVideo } from './pages/SharedVideo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/shared/:id" element={<SharedVideo />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <MainLayout>
                <Home />
              </MainLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/create"
          element={
            <AuthGuard>
              <MainLayout>
                <CreateDeepfake />
              </MainLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/history"
          element={
            <AuthGuard>
              <MainLayout>
                <History />
              </MainLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/subscription"
          element={
            <AuthGuard>
              <MainLayout>
                <Subscription />
              </MainLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <MainLayout>
                <Profile />
              </MainLayout>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;