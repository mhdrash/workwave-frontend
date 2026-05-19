import React from 'react'
import { getAllJobs } from '../services/jobService'

function Homepage() {


  const fetchAllJobs = async ()=> {
    try {
      const jobs = getAllJobs()
    } catch (error) {
      
    }
  }
  return (
    <div>
      <h1>Job Bank</h1>

      {}
    </div>
  )
}

export default Homepage