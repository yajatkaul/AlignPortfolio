//@ts-nocheck
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSites = (name) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const decodedString = decodeURIComponent(name);
  useEffect(() => {
    const getSites = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/site/getSites/${decodedString}`);

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setSites(data);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    getSites();
  }, []);

  return { sites, loading };
};

export default useGetSites;
