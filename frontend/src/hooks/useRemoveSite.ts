//@ts-nocheck
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useRemoveSites = () => {
  const [loading2, setLoading] = useState(false);

  const removeSite = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/site/removeSite/${id}`);

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.result);
      location.reload();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return { removeSite, loading2 };
};

export default useRemoveSites;
