// @ts-nocheck
import { useState } from "react";
import toast from "react-hot-toast";

const useUploadFiles = () => {
  const [loading, setLoading] = useState(false);

  const upload = async (siteName, items) => {
    let filteredImages = [];
    let filteredCategories = [];
    const imageSeperator = () => {
      items.forEach((item: any) => {
        filteredImages.push(item[0]);
        filteredCategories.push(item[1]);
      });
    };

    imageSeperator();

    const formData = new FormData();
    formData.append("siteName", siteName);
    filteredImages.forEach((image) => {
      formData.append("image", image);
    });
    formData.append("categores", filteredCategories);
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
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, upload };
};

export default useUploadFiles;
