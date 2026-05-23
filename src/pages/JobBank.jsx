import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import JobCard from './jobSeekerPages/JobCard';
import { getAllJobs } from '../services/jobService';

function JobBank({ user }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await getAllJobs();
        const jobList = Array.isArray(data) ? data : data.jobs || data.jobCards || [];

        setJobs(jobList);
      } catch (err) {
        setError(err?.message || 'Unable to load jobs.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    if (!user) {
      navigate('/sign-up');
      return;
    }

    navigate(`/application-review/${jobId}`);
  };

  return (
    <main className="job-bank">
      <h1>Job bank</h1>

      {isLoading && <p>Loading jobs...</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && jobs.length === 0 && (
        <p>No jobs have been posted yet.</p>
      )}

      {!isLoading && !error && jobs.length > 0 && (
        <div className="job-card-list">
          {jobs.map((job) => (
            <div key={job._id || job.id}>
              <JobCard job={job} />
              <button type="button" onClick={() => handleApply(job._id || job.id)}>
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default JobBank
