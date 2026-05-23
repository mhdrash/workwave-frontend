import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import JobCard from './jobSeekerPages/JobCard';
import { deleteJob, getAllJobs } from '../services/jobService';

function getJobCompanyId(job) {
  if (typeof job.company === 'object') {
    return job.company?._id;
  }

  return job.companyDetails?._id || job.company;
}

function JobBank({ user }) {
  const navigate = useNavigate();
  const isEmployer = user?.is_employer;
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

  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId);
      setJobs((currentJobs) =>
        currentJobs.filter((job) => (job._id || job.id) !== jobId)
      );
    } catch (err) {
      setError(err?.message || 'Unable to delete job.');
    }
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
              {isEmployer && getJobCompanyId(job) === user?.company?._id && (
                <>
                  <button
                    type="button"
                    onClick={() => navigate(`/job-form/${job._id || job.id}`)}
                  >
                    Edit Job
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(job._id || job.id)}
                  >
                    Delete Job
                  </button>
                </>
              )}
              {!isEmployer && (
                <>
                  <button type="button" onClick={() => handleApply(job._id || job.id)}>
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/job-details/${job._id || job.id}`)}
                  >
                    See Details
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default JobBank
