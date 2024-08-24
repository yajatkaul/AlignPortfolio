// @ts-nocheck
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSites = () => {
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState();

  useEffect(() => {
    const sites = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/data/getSites`);

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setSites(data);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    sites();
  }, []);

  return { loading, sites };
};

export default useGetSites;
