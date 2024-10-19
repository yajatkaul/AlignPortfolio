//@ts-nocheck
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSites = (name, page) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more sites are available
  const decodedString = decodeURIComponent(name);

  useEffect(() => {
    const getSites = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/site/getSites/${decodedString}?limit=3&skip=${page * 3}`
        );

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.length < 3) {
          setHasMore(false); // No more sites to load if returned data is less than the limit
        }

        setSites((prevSites) => [...prevSites, ...data]); // Append new data
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSites();
  }, [page, name]);

  return { sites, loading, hasMore };
};

export default useGetSites;
