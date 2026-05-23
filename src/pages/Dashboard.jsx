import axios from 'axios';
import { useEffect, useState } from 'react'

function Dashboard({ user }) {
  const [profile, setProfile] = useState(null);
  const profileDetails = profile?.profile;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/profile/${user._id}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [user._id]);

  return (
    <main>
        <h1>Welcome {user.cpr}</h1>
        <h2>Profile:</h2>
        {profileDetails ? (
            <div>
                <p>Name: {profileDetails.name}</p>
                <p>About: {profileDetails.about}</p>
            </div>
        ) : (
            <p>You have not created a profile yet.</p>
        )}
    </main>
  )
}

export default Dashboard
