"use client";
import Header from "@/components/local/Header";
import React from "react";
import useSiteUpload from "@/hooks/useSiteUpload";

const Page = () => {
  const {
    siteName,
    category,
    handleSiteNameChange,
    handleCategoryChange,
    handleFilesChange,
    handleUpload,
  } = useSiteUpload();

  return (
    <>
      <Header />
      <div className="flex h-screen justify-center items-center flex-col gap-4">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow"
            placeholder="Site Name"
            value={siteName}
            onChange={handleSiteNameChange}
          />
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={handleCategoryChange}
        >
          <option disabled selected>
            Category
          </option>
          <option>Sliding Door</option>
          <option>Swing Door</option>
          <option>Shower</option>
          <option>Wardrobe</option>
          <option>Railing</option>
          <option>Mirror</option>
          <option>Wall Cladding</option>
          <option>Other</option>
        </select>
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          multiple
          onChange={handleFilesChange}
        />
        <button className="btn" onClick={handleUpload}>
          Upload Site
        </button>
      </div>
    </>
  );
};

export default Page;
