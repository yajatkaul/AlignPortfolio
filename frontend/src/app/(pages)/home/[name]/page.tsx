// @ts-nocheck
"use client";
import Header from "@/components/local/Header";
import { useAuthContext } from "@/context/AuthContext";
import useGetSites from "@/hooks/useGetSites";
import useRemoveSites from "@/hooks/useRemoveSite";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { name: string } }) => {
  const { loading2, removeSite } = useRemoveSites();
  const { sites, loading, total, setPage } = useGetSites(params.name);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const { authUser } = useAuthContext();

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

  // Handle scrolling to load more sites
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading &&
        sites.length < total
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, sites.length, total]);

  return (
    <>
      <Header />
      <div className="pt-[100px] ml-[40px]">
        {sites.map((site, index) => {
          return (
            <div key={index} className="flex flex-col">
              <p className="text-[35px]">{site.siteName}</p>
              <div className="flex gap-8 flex-wrap">
                {site.files.map((file, fileIndex) => {
                  const isImage = file.match(
                    /\.(jpeg|jpg|png|gif|webp|heic)$/i
                  );
                  const isVideo = file.match(/\.(mp4|mkv|mov)$/i);

                  return isImage ? (
                    <img
                      key={fileIndex}
                      src={`/api/${file}`}
                      alt=""
                      className="w-[300px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105 rounded-2xl"
                      onClick={() => openModal(site.files, fileIndex)}
                    />
                  ) : isVideo ? (
                    <video
                      key={fileIndex}
                      src={`/api/${file}`}
                      controls
                      className="w-[300px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105 rounded-2xl"
                      onClick={() => openModal(site.files, fileIndex)}
                    />
                  ) : null;
                })}
              </div>
              <div className="flex w-full justify-end">
                <Trash2
                  className={`text-red-600 size-[50px] cursor-pointer ${
                    authUser?.includes("Employee") ? "inline" : "hidden"
                  }`}
                  onClick={() =>
                    document.getElementById(`my_modal_${site._id}`).showModal()
                  }
                />
                <dialog id={`my_modal_${site._id}`} className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Delete Warning!</h3>
                    <div className="flex flex-col justify-center">
                      <div className="flex justify-center items-center gap-2 text-[25px] flex-wrap text-wrap">
                        <p className="py-4">
                          Attention you are about to delete
                        </p>
                        <p className="font-bold">{site.siteName}</p>
                      </div>
                      <button
                        className="btn hover:bg-red-700 hover:text-white text-[20px]"
                        onClick={() => {
                          removeSite(site._id);
                        }}
                        disabled={loading2}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          );
        })}
        {loading && <p>Loading more sites...</p>}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <button
            className="absolute top-4 right-4 text-white text-[40px]"
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

          {currentImages[currentImageIndex].match(
            /\.(jpeg|jpg|png|gif|webp|heic)$/i
          ) ? (
            <img
              src={`/api/${currentImages[currentImageIndex]}`}
              alt=""
              className="w-[800px] object-contain"
            />
          ) : currentImages[currentImageIndex].match(/\.(mp4|mkv|mov)$/i) ? (
            <video
              src={`/api/${currentImages[currentImageIndex]}`}
              controls
              className="w-[800px] object-contain max-h-[700px]"
            />
          ) : null}

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
