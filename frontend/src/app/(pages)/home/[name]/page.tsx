// @ts-nocheck
"use client";
import Header from "@/components/local/Header";
import useGetSites from "@/hooks/useGetSites";
import React, { useState } from "react";

const Page = ({ params }: { params: { name: string } }) => {
  const { sites, loading } = useGetSites(params.name);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  const openModal = (images, index) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Header />
      <div className="pt-[100px] ml-[40px]">
        {sites.map((site, index) => {
          return (
            <div key={index} className="flex flex-col">
              <p className="text-[35px]">{site.siteName}</p>
              <div className="flex gap-8 flex-wrap">
                {site.files.map((image, imageIndex) => {
                  return (
                    <img
                      key={imageIndex}
                      src={`/api/${image}`}
                      alt=""
                      className="w-[300px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105 rounded-2xl"
                      onClick={() => openModal(site.files, imageIndex)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <button
            className="absolute left-4 text-white text-2xl"
            onClick={showPreviousImage}
          >
            &#10094; {/* Left arrow */}
          </button>
          <img
            src={`/api/${currentImages[currentImageIndex]}`}
            alt=""
            className="w-[800px] object-contain"
          />
          <button
            className="absolute right-4 text-white text-2xl"
            onClick={showNextImage}
          >
            &#10095; {/* Right arrow */}
          </button>
        </div>
      )}
    </>
  );
};

export default Page;
