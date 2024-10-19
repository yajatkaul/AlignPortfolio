//@ts-nocheck
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSites = (name) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const decodedString = decodeURIComponent(name);

  const fetchSites = async (pageNumber) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/site/getSites/${decodedString}?page=${pageNumber}&limit=3`
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setSites((prev) => [...prev, ...data.sites]); // Append new sites to the existing ones
      setTotal(data.total); // Update total count
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites(page);
  }, [page]);

  return { sites, loading, total, setPage };
};

export default useGetSites;
