import { useState, useEffect } from 'react';
import axios from 'axios';

const useActivePrograms = () => {
  const [activePrograms, setActivePrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivePrograms = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/userProfile/activePrograms', {
          withCredentials: true,
        });
        setActivePrograms(response.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePrograms();
  }, []);

  return { activePrograms, loading, error };
};

export default useActivePrograms;
