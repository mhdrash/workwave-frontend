import { useState } from 'react';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

function CompanyForm({ user }) {
  const [formData, setFormData] = useState({
    name: '',
    cr: '',
    description: '',
    crCert: '',
    website: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return (
      <div>
        <nav>
          <h1>WorkWave</h1>
        </nav>
        <p>Please sign in before creating a company.</p>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    console.log(user._id);
    
    const payload = {
      name: formData.name,
      cr: formData.cr ? Number(formData.cr) : '',
      description: formData.description,
      crCert: formData.crCert,
      website: formData.website,
      employer: user._id,
    };

    console.log('User object:', user);
    console.log('User ID:', user._id);
    console.log('Payload being sent:', payload);

    try {
      const response = await axios.post(`${BASE_URL}/company`, payload);
      console.log('Response:', response);
      setSuccessMessage('Company created successfully.');
      setFormData({ name: '', cr: '', description: '', crCert: '', website: '' });
    } catch (error) {
      console.log('Error response:', error.response?.data);
      setErrorMessage(
        error.response?.data?.err || error.message || 'Unable to create company.'
      );
    }
  };

  return (
    <div>
      <nav>
        <h1>WorkWave</h1>
      </nav>

      <h1>Company Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Company name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="cr">Company cr:</label>
          <input
            id="cr"
            name="cr"
            type="number"
            value={formData.cr}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="crCert">CR Cert:</label>
          <input
            id="crCert"
            name="crCert"
            type="text"
            value={formData.crCert}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="website">Website:</label>
          <input
            id="website"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create company</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default CompanyForm;