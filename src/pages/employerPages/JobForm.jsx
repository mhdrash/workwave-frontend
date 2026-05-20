import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../../services/api';
import { createJob } from '../../services/jobService';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

function JobForm({ user }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    companyId: '',
  });
  const [companies, setCompanies] = useState([]);
  const [companiesRaw, setCompaniesRaw] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // fetchCompanies made top-level so we can call it from the UI (Reload button)
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      // Try primary endpoint
      let response = await apiClient.get('/company');
      console.debug('GET /company response.data:', response.data);
      setCompaniesRaw(response.data);

      // Normalize possible response shapes to an array of companies
      let companiesData = [];
      if (Array.isArray(response.data)) companiesData = response.data;
      else if (Array.isArray(response.data.companies)) companiesData = response.data.companies;
      else if (Array.isArray(response.data.data)) companiesData = response.data.data;
      else if (Array.isArray(response.data.company)) companiesData = response.data.company;

      // If nothing returned, try alternative plural endpoint
      if (!companiesData.length) {
        try {
          const alt = await apiClient.get('/companies');
          console.debug('GET /companies response.data:', alt.data);
          // keep a copy of the raw response
          setCompaniesRaw((prev) => prev || alt.data);
          if (Array.isArray(alt.data)) companiesData = alt.data;
          else if (Array.isArray(alt.data.companies)) companiesData = alt.data.companies;
          else if (Array.isArray(alt.data.data)) companiesData = alt.data.data;
          else if (Array.isArray(alt.data.company)) companiesData = alt.data.company;
        } catch (altErr) {
          console.debug('GET /companies failed:', altErr?.response?.status, altErr?.message);
        }
      }

      setCompanies(companiesData || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setErrorMessage(error.response?.data?.err || error.message || 'Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch companies on mount; authentication header included if token exists
    fetchCompanies();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.companyId) {
      setErrorMessage('Please select a company');
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      companyId: formData.companyId,
    };

    console.log('Payload being sent:', payload);

    try {
      const result = await createJob(payload);
      console.log('Create job result:', result);
      setSuccessMessage('Job created successfully.');
      setFormData({ title: '', description: '', companyId: '' });
    } catch (error) {
      console.log('Error response:', error.response?.data || error);
      setErrorMessage(
        error.response?.data?.err || error.err || error.message || 'Unable to create job.'
      );
    }
  };

  return (
    <div>
      <nav>
        <h1>WorkWave</h1>
      </nav>

      <h1>Job Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Job Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            minLength="4"
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            minLength="30"
            rows="5"
          />
        </div>

        <div>
          <label htmlFor="companyId">Select Company:</label>
          <select
            id="companyId"
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">-- Choose a company --</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Create Job'}
        </button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default JobForm;