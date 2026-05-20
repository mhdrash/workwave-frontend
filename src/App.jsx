import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import JobBank from './pages/JobBank';
import SignUp from './pages/Signup';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CompanyForm from './pages/employerPages/CompanyForm';
import JobForm from './pages/employerPages/JobForm';
import JobDetails from './pages/employerPages/JobDetails';
import JobList from './pages/employerPages/JobList';
import MyApplications from './pages/jobSeekerPages/MyApplications';
import Profile from './pages/jobSeekerPages/Profile';
import JobCard from './pages/jobSeekerPages/JobCard';
import './App.css';
import axios from 'axios';
import apiClient from './services/api';

function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userInfo = JSON.parse(atob(token.split('.')[1])).payload;
        setUser(userInfo);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<JobBank />} />
        <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to='/dashboard'/>} />
        <Route path="/sign-in" element={!user ? <SignIn setUser={setUser} /> : <Navigate to='/dashboard'/>} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/my-applications" element={user ? <MyApplications user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/job/:id" element={user ? <JobCard user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/company-form" element={<CompanyForm user={user} />} />
        <Route path="/job-form" element={<JobForm />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/job-list" element={<JobList />} />

   
      </Routes>
    </div>
  );
}

export default App;