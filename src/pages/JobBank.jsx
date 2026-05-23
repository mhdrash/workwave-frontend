import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import JobCard from './jobSeekerPages/JobCard';
import { deleteJob, getAllJobs } from '../services/jobService';
import { getMyApplications } from '../services/applicationService';

function getJobCompanyId(job) {
  if (typeof job.company === 'object') {
    return job.company?._id;
  }

  return job.companyDetails?._id || job.company;
}

function getApplicationsArray(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.applications)) {
    return data.applications;
  }

  if (data.application) {
    return Array.isArray(data.application) ? data.application : [data.application];
  }

  return data._id || data.id ? [data] : [];
}

function getApplicationJobId(application) {
  if (typeof application.job === 'object') {
    return application.job?._id || application.job?.id;
  }

  return application.job || application.jobId;
}

function JobBank({ user }) {
  const navigate = useNavigate();
  const isEmployer = user?.is_employer;
  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
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

  useEffect(() => {
    async function fetchApplications() {
      if (!user || isEmployer) {
        setAppliedJobIds([]);
        return;
      }

      try {
        const data = await getMyApplications(user._id);
        const jobIds = getApplicationsArray(data)
          .map(getApplicationJobId)
          .filter(Boolean);

        setAppliedJobIds(jobIds);
      } catch (err) {
        setError(err?.message || 'Unable to load applications.');
      }
    }

    fetchApplications();
  }, [user, isEmployer]);

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
              <div className="actions">
              {isEmployer && getJobCompanyId(job) === user?.company?._id && (
                <>
                  <button
                    className="job-bank-button"
                    type="button"
                    onClick={() => navigate(`/job-form/${job._id || job.id}`)}
                  >
                    Edit Job
                  </button>
                  <button
                    className="job-bank-button"
                    type="button"
                    onClick={() => handleDelete(job._id || job.id)}
                  >
                    Delete Job
                  </button>
                </>
              )}
              {!isEmployer && (
                <>
                  {!appliedJobIds.includes(job._id || job.id) && (
                    <button
                      className="job-bank-button"
                      type="button"
                      onClick={() => handleApply(job._id || job.id)}
                    >
                      Apply
                    </button>
                  )}
                  <button
                    className="job-bank-button"
                    type="button"
                    onClick={() => navigate(`/job-details/${job._id || job.id}`)}
                  >
                    See Details
                  </button>
                </>
              )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default JobBank
