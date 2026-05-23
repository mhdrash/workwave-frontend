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
import ApplicationReview from './pages/jobSeekerPages/ApplicationReview';
import './App.css';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const isEmployer = user?.is_employer;
  const canPostJob = isEmployer && Boolean(user?.company?._id);

  
  async function getCompany(id){
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company/employer/${id}`);
      console.log("Company data:", response.data);
      return response.data.company;

    }
    catch (error) {
      console.error("Error fetching company data:", error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    try {
      const userInfo = JSON.parse(atob(token.split('.')[1])).payload;

      getCompany(userInfo._id)
        .then((company) => {
          userInfo.company = company;
          setUser(userInfo);
        })
        .catch((err) => {
          console.error('Error fetching company:', err);
        });
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
    }
  }, []);

  return (
    <div className="app-shell" data-theme={isEmployer ? 'workwave-dark' : 'workwave-light'}>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<JobBank user={user} />} />
        <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to='/'/>} />
        <Route path="/sign-in" element={!user ? <SignIn setUser={setUser} /> : <Navigate to='/'/>} />
        <Route path="/dashboard" element={isEmployer ? <Dashboard user={user} /> : <Navigate to='/'/>} />
        <Route path="/my-applications" element={user && !isEmployer ? <MyApplications user={user} /> : <Navigate to='/'/>} />
        <Route path="/application-review/:jobId" element={user ? <ApplicationReview user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/profile" element={user && !isEmployer ? <Profile user={user} /> : <Navigate to='/'/>} />
        <Route path="/job-card" element={isEmployer ? <JobCard user={user} /> : <Navigate to='/'/>} />
        <Route path="/job/:id" element={user ? <JobCard user={user} /> : <Navigate to='/sign-in'/>} />
        <Route path="/company-form" element={isEmployer ? <CompanyForm user = {user} setUser = {setUser}/> : <Navigate to='/'/>} />
        <Route path="/job-form" element={canPostJob ? <JobForm user={user} /> : <Navigate to='/company-form'/>} />
        <Route path="/job-form/:jobId" element={canPostJob ? <JobForm user={user} /> : <Navigate to='/company-form'/>} />
        <Route path="/job-details/:id" element={<JobDetails user={user} />} />
        <Route path="/job-list" element={<JobList />} />

   
      </Routes>
    </div>
  );
}

export default App;
