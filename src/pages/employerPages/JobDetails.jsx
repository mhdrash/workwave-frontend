import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getJobById } from '../../services/jobService';
import {
  deleteApplication,
  getMyApplications,
} from '../../services/applicationService';

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

function JobDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getJobById(id)
      .then((data) => {
        setJob(data.jobCard || data.job || data);
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load job details.');
      });
  }, [id]);

  useEffect(() => {
    if (!user || user.is_employer) {
      return;
    }

    getMyApplications(user._id)
      .then((data) => {
        const foundApplication = getApplicationsArray(data).find(
          (application) => getApplicationJobId(application) === id
        );

        setApplication(foundApplication || null);
      })
      .catch((err) => {
        setError(err?.message || 'Unable to load application status.');
      });
  }, [id, user]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!job) {
    return <p>Loading job details...</p>;
  }

  const companyName =
    typeof job.company === 'object' ? job.company?.name : job.company;
  const handleApply = () => {
    if (!user) {
      navigate('/sign-up');
      return;
    }

    navigate(`/application-review/${id}`);
  };
  const handleWithdraw = async () => {
    try {
      await deleteApplication(application._id || application.id);
      setApplication(null);
    } catch (err) {
      setError(err?.message || 'Unable to withdraw application.');
    }
  };
  const handleBack = () => {
    if (user && !user.is_employer && application) {
      navigate('/my-applications');
      return;
    }

    navigate('/');
  };

  return (
    <main>
      <h1>{job.title}</h1>
      <section>
        {companyName && <p>Company: {companyName}</p>}
        {job.location && <p>Location: {job.location}</p>}
        {job.description && <p>{job.description}</p>}
      </section>
      <div className="actions">
        {!user?.is_employer && !application && (
          <button type="button" onClick={handleApply}>
            Apply
          </button>
        )}
        {!user?.is_employer && application && (
          <button type="button" onClick={handleWithdraw}>
            Withdraw
          </button>
        )}
        <button type="button" onClick={handleBack}>
          Back
        </button>
      </div>
    </main>
  )
}

export default JobDetails
