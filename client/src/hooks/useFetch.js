import React, { useEffect, useState } from "react";

const useFetch = (uri) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!uri) return;
      try {
        setLoading(true);
        const response = await fetch(uri);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [uri]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
