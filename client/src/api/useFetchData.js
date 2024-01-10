import { useState, useEffect } from 'react';
import { endPoints } from '../api/dataFetcher';

const useFetchData = (identifier) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endPoints[identifier]) {
      setError(new Error('Invalid api identifier'));
      return;
    }
    
    setLoading(true);
    endPoints[identifier]()
      .then(response => {
        setData(response.data);
        setError(null);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useFetchData;
