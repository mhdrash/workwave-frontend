import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Signup() {
  const [formData, setFormData] = useState({
    cpr: '',
    password: '',
    is_employer: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    const value =
      event.target.name === 'is_employer'
        ? event.target.value === 'true'
        : event.target.value;

    setFormData({ ...formData, [event.target.name]: value });
  };

  async function handleSubmit(event){
    event.preventDefault()

    try {
      console.log(import.meta.env.VITE_BACKEND_URL);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`, formData);
      navigate('/sign-in');
    } catch (err) {
      setErrorMessage(err.response?.data?.err || 'An error occurred during sign up');
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Sign up as</p>
          <label htmlFor="jobseeker">
            <input
              id="jobseeker"
              name="is_employer"
              type="radio"
              value="false"
              checked={!formData.is_employer}
              onChange={handleChange}
            />
            Job Seeker
          </label>
          <label htmlFor="employer">
            <input
              id="employer"
              name="is_employer"
              type="radio"
              value="true"
              checked={formData.is_employer}
              onChange={handleChange}
            />
            Employer
          </label>
        </div>

        <div>
          <label htmlFor="cpr">CPR</label>
          <input
            id="cpr"
            name="cpr"
            type="text"
            value={formData.cpr}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account?</p>
      <button type="button" onClick={() => navigate('/sign-in')}>
        Sign In
      </button>
      {errorMessage && <p style={{ color: 'red' }} role="alert">{errorMessage}</p>}
    </main>
  );
}

export default Signup;
