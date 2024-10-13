// @ts-nocheck
"use client";
import Header from "@/components/local/Header";
import toggleButton from "../../../json/toggleButtons.json";
import { useState } from "react";
import toast from "react-hot-toast";
import useUploadFiles from "@/hooks/useUploadFile";

const Page = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const { loading, upload } = useUploadFiles();

  // Temporary state for selected files and category
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const addItems = () => {
    if (!selectedCategory) {
      return toast.error("Please select a category");
    }
    if (selectedFiles.length === 0) {
      return toast.error("Please select at least one file");
    }
    if (data.length + selectedFiles.length > 80) {
      return toast.error("Only 80 images can be uploaded");
    }

    // Map each selected file to an individual entry in data
    const newData = selectedFiles.map((file) => ({
      file,
      category: selectedCategory,
    }));

    setData([...data, ...newData]);
    setSelectedFiles([]);
    setSelectedCategory("");
  };

  const create = async () => {
    if (!name) {
      return toast.error("Enter site name");
    }
    if (data.length === 0) {
      return toast.error("No files to upload");
    }

    const formData = new FormData();
    formData.append("siteName", name);

    data.forEach((item, index) => {
      if (item.file && item.category) {
        formData.append(`file_${index}`, item.file);
        formData.append(`category_${index}`, item.category);
      }
    });

    try {
      await upload(formData);
      toast.success("Upload successful");
      setData([]);
      setName("");
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  return (
    <>
      <Header />
      <div className="flex bg-[url('/bg.jpg')] bg-cover bg-fixed bg-no-repeat overflow-auto w-screen justify-center items-center pl-[80px] pr-[80px] min-h-screen">
        <div className="mt-[120px]">
          <div className="flex flex-col gap-2 items-center ">
            <label className="input input-bordered flex items-center gap-2">
              {/* SVG icon (omitted for brevity) */}
              <input
                type="text"
                className="grow"
                placeholder="Site name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                multiple
              />

              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option disabled value="">
                  Category
                </option>
                {toggleButton.items.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button className="btn" onClick={addItems}>
                Add Items
              </button>
            </div>

            {/* Display the list of files and their categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2 border p-2">
                  <span>{item.file.name}</span>
                  <span className="badge">{item.category}</span>
                </div>
              ))}
            </div>

            <button
              className={`btn mt-4 ${loading ? "loading" : ""}`}
              onClick={create}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Create"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
