import axios from 'axios';
import {useState, useEffect, use} from 'react'

function JobForm({user}) {
  const [jobData, setJobData] = useState(null);


  function handleChange(e) {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      title: jobData.title,
      description: jobData.description,
      company: user.company._id
    };
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/job-cards`, jobData)
      .then((response) => {
        console.log("Job created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating job:", error);
      });
  }
  
  return (
    <div>
      <h1>Job Form</h1>

      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData?.title || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Job Description"
          value={jobData?.description || ''}
          onChange={handleChange}
        />
        <button type="submit">Create Job</button>
      </form>
    </div>
  )
}

export default JobForm