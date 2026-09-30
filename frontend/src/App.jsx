import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import VillagesPage from './pages/VillagesPage.jsx';
import ClansPage from './pages/ClansPage.jsx';
import ShinobiArchivePage from './pages/ShinobiArchivePage.jsx';
import AlliancePage from './pages/AlliancePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/villages" element={<VillagesPage />} />
              <Route path="/clans" element={<ClansPage />} />
              <Route path="/archive" element={<ShinobiArchivePage />} />
              <Route path="/alliance" element={<AlliancePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
