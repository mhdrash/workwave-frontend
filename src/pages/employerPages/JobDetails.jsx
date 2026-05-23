import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getJobById } from '../../services/jobService';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
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

  if (error) {
    return <p>{error}</p>;
  }

  if (!job) {
    return <p>Loading job details...</p>;
  }

  const companyName =
    typeof job.company === 'object' ? job.company?.name : job.company;

  return (
    <main>
      <h1>{job.title}</h1>
      {companyName && <p>Company: {companyName}</p>}
      {job.location && <p>Location: {job.location}</p>}
      {job.description && <p>{job.description}</p>}
    </main>
  )
}

export default JobDetails
