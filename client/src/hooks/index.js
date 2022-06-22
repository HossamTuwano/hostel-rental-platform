import { useEffect, useState, useCallback } from "react";

export const useFetch = (uri) => {
  const [data, setData] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [street, setStreet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!uri) return;
      try {
        setLoading(true);
        const response = await fetch(uri, {
          headers: {
            auth: "Bearer " + localStorage.getItem("token"),
          },
        });
        const result = await response.json();
        setData(result);
        setDistrict(result);
        setWard(result)
        setStreet(result)
       
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
    district,
    ward,
    street,
  };
};

export const useFetchPost = ({ url, headers, payload }) => {
  const [res, setRes] = useState({
    data: "",
    loading: "",
    error: "",
  });
  const [error, setError] = useState();

  // fetch API here

  const callAPI = useCallback(async () => {
    setRes((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(url, headers);
      const data = await response.json();
      setRes({ loading: false, data: data, error: null });
    } catch (error) {
      setRes({ data: null, loading: false, error });
    }
  }, [url, headers, payload]);
};
