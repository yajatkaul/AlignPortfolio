//@ts-nocheck
import { useState } from "react";
import toast from "react-hot-toast";

const useSiteUpload = () => {
  const [siteName, setSiteName] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSiteNameChange = (e) => {
    setSiteName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleFilesChange = (e) => {
    setFiles(Array.from(e.target.files)); // Convert FileList to an array
  };

  const handleUpload = async () => {
    if (!siteName || !category || files.length === 0) {
      alert("Please fill in all fields and attach files.");
      return;
    }

    const formData = new FormData();
    formData.append("siteName", siteName);
    formData.append("category", category);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true);
      const response = await fetch("/api/site/addSite", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      toast.success(data.result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    siteName,
    category,
    files,
    handleSiteNameChange,
    handleCategoryChange,
    handleFilesChange,
    handleUpload,
    loading,
  };
};

export default useSiteUpload;
