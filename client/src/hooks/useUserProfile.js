import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://your-api-url.com/user/profile', {
          withCredentials: true,
          headers: {
            Cookie: `psg_auth_token=${authResult.auth_token}`
          }
        });
        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

export default useUserProfile;
