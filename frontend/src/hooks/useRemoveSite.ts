// @ts-nocheck
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useRemoveSite = (id) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const removeSite = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/data/site/${id}`);

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.result);
      router.push("/");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, removeSite };
};

export default useRemoveSite;
