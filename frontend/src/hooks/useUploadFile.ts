// @ts-nocheck
import { useState } from "react";
import toast from "react-hot-toast";

const useUploadFiles = () => {
  const [loading, setLoading] = useState(false);

  const upload = async (formData) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/employee/createSiteData`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.result);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, upload };
};

export default useUploadFiles;
