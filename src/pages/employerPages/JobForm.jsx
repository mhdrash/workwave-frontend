import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { createJob, getJobById, updateJob } from '../../services/jobService';

function JobForm({user}) {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const isEditing = Boolean(jobId);
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const companyDetails = user?.company;

  useEffect(() => {
    if (!jobId) {
      return;
    }

    getJobById(jobId)
      .then((data) => {
        const job = data.jobCard || data.job || data;

        setJobData({
          title: job.title || '',
          location: job.location || '',
          description: job.description || '',
        });
      })
      .catch((err) => {
        setError(err?.message || 'Error loading job.');
      });
  }, [jobId]);


  function handleChange(e) {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  }


  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!companyDetails?._id) {
      setError('Please create a company before posting a job.');
      return;
    }

    const payload = {
      title: jobData.title,
      location: jobData.location,
      description: jobData.description,
      company: companyDetails._id,
      companyDetails: {
        _id: companyDetails._id,
        name: companyDetails.name,
        cr: companyDetails.cr,
        description: companyDetails.description,
        logo: companyDetails.logo,
        crCert: companyDetails.crCert,
        website: companyDetails.website,
        employer: companyDetails.employer || user._id,
      },
    };

    try {
      setIsSubmitting(true);
      if (isEditing) {
        await updateJob(jobId, payload);
      } else {
        await createJob(payload);
      }
      setJobData({
        title: '',
        location: '',
        description: '',
      });
      navigate('/job-card');
    } catch (err) {
      setError(err?.message || 'Error creating job.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <main>
      <h1>{isEditing ? 'Edit Job' : 'Post a Job'}</h1>

      {error && <p>{error}</p>}

      {companyDetails && (
        <section>
          <h2>{companyDetails.name}</h2>
          <p>{companyDetails.description}</p>
          {companyDetails.website && <p>{companyDetails.website}</p>}
        </section>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Job Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Job Title"
            value={jobData.title}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
            value={jobData.location}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="description">Job Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Job Description"
            value={jobData.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? isEditing ? 'Saving...' : 'Posting...'
            : isEditing ? 'Save Job' : 'Create Job'}
        </button>
        {isEditing && (
          <button type="button" onClick={() => navigate('/')}>
            Cancel Changes
          </button>
        )}
      </form>
    </main>
  )
}

export default JobForm;
