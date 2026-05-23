import { useState } from "react";
import axios from "axios";

function CompanyForm({ user ,setUser}) {
  const emptyCompanyForm = {
    name: "",
    cr: "",
    description: "",
    logo: "",
    crCert: "",
    website: "",
  };

  const companyToFormData = (company) => ({
    name: company?.name || "",
    cr: company?.cr || "",
    description: company?.description || "",
    logo: company?.logo || "",
    crCert: company?.crCert || "",
    website: company?.website || "",
  });

  const [formData, setFormData] = useState(() =>
    user?.company?._id ? companyToFormData(user.company) : emptyCompanyForm
  );
  const [isEditing, setIsEditing] = useState(!user?.company?._id);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        cr: Number(formData.cr),
        employer: user._id,
      };
      const response = user?.company?._id
        ? await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/company/${user.company._id}`,
          payload
        )
        : await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/company`,
          payload
        );

      const company =
        response.data.company?.company || response.data.company || response.data;

      setUser({ ...user, company });
      setIsEditing(false);
      
    } catch (error) {
      console.error("Error creating company:", error);
      setError(error.response?.data?.err || "Error saving company details.");
    }
  };

  const handleEditDetails = () => {
    setFormData(companyToFormData(user.company));
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData(companyToFormData(user.company));
    setIsEditing(false);
    setError("");
  };

  if (user?.company?._id && !isEditing) {
    return (
      <main>
        <h1>Company Details</h1>

        <section>
          <p>Name: {user.company.name}</p>
          <p>CR Number: {user.company.cr}</p>
          <p>Description: {user.company.description}</p>
          {user.company.logo && <p>Logo: {user.company.logo}</p>}
          <p>CR Certificate: {user.company.crCert}</p>
          {user.company.website && <p>Website: {user.company.website}</p>}
        </section>

        <button type="button" onClick={handleEditDetails}>
          Edit Details
        </button>
      </main>
    );
  }

  return (
    <main>
      <h1>{user?.company?._id ? "Edit Company Details" : "Create Company"}</h1>

      {error && <p>{error}</p>}

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

        <button type="submit">
          {user?.company?._id ? "Save Details" : "Create Company"}
        </button>

        {user?.company?._id && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </main>
  );
}

export default CompanyForm;
