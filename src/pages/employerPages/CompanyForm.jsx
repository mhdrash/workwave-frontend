import React, { useState } from "react";
import axios from "axios";

function CompanyForm({ user ,setUser}) {
  const [formData, setFormData] = useState({
    name: "",
    cr: "",
    description: "",
    logo: "",
    crCert: "",
    website: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/company`,
        {...formData, employer: user._id}
      );

      console.log("Company created:", response.data);

      // optional reset
      setFormData({
        name: "",
        cr: "",
        description: "",
        logo: "",
        crCert: "",
        website: "",
        employer: user._id,
      });

      setUser({ ...user, company: response.data.company.company });
      
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  return (
    <div>
      <h1>Create Company</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Company Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="cr">CR Number:</label>
          <input
            id="cr"
            name="cr"
            type="number"
            value={formData.cr}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="logo">Logo URL:</label>
          <input
            id="logo"
            name="logo"
            type="text"
            value={formData.logo}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label htmlFor="crCert">CR Certificate URL:</label>
          <input
            id="crCert"
            name="crCert"
            type="text"
            value={formData.crCert}
            onChange={handleChange}
            required
          />
        </div>

        <br />

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

        <br />

        <button type="submit">Create Company</button>
      </form>
    </div>
  );
}

export default CompanyForm;