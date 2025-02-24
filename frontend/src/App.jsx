import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './components/Layout/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AddTournament from './pages/admin/AddTournament';
import Tournaments from './pages/admin/Tournaments';
import TournamentDetailsPage from './pages/admin/TournamentDetailsPage';
import UserRegistrationPage from './pages/user/UserRegistrationPage'
import UserLoginPage from './pages/user/UserLoginPage';

function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>

            <Route path='/registration' element={<UserRegistrationPage />} />
            <Route path='/login' element={<UserLoginPage />} />
            <Route path='/' element={<AdminLoginPage />} />

            {/* Admin Layout */}
            <Route path='/admin' element={<AdminLayout />} >
              <Route path='dashboard' element={<AdminDashboardPage />} />
              <Route path='add-tournament' element={<AddTournament />} />
              <Route path='all-tournaments' element={<Tournaments />} />
              <Route path='all-tournaments/:id' element={<TournamentDetailsPage />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
