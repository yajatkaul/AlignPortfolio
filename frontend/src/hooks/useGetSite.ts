// @ts-nocheck
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSite = (id) => {
  const [loading, setLoading] = useState(false);
  const [site, setSites] = useState();

  useEffect(() => {
    const site = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/data/getSite/${id}`);

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
    site();
  }, []);

  return { loading, site };
};

export default useGetSite;
