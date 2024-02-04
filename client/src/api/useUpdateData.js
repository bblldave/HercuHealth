import { useState, useEffect } from "react";
import { endPoints } from "./dataUpdater";

const useUpdateData = (identifier) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (params, data) => {
    if (!endPoints[identifier]) {
      setError(new Error('Invalid api identifier'));
      return;
    }

    setLoading(true);
    const path = params.join('/');
    try {
      const response = await endPoints[identifier](path, data);
      setData(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateData };
}

export default useUpdateData;