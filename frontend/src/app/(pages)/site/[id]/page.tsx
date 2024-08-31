// @ts-nocheck
"use client";
import Header from "@/components/local/Header";
import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import useGetSite from "@/hooks/useGetSite";
import { useFilterContext } from "@/context/FilterContext";

const Page = ({ params }: { params: { id: string } }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [showImage, setShowImage] = useState(false);
  const { loading, site } = useGetSite(params.id);
  const { filters } = useFilterContext();
  const [filteredImages, setFilteredImages] = useState();

  useEffect(() => {
    if (site) {
      const filtered = site.items.filter((item) => filters.includes(item[1]));
      setFilteredImages(filtered);
    }
  }, [site, filters]);

  const imagesToShow =
    filteredImages && filteredImages.length > 0 ? filteredImages : site?.items;

  const createDictionaryByType = (items) => {
    const dictionary = {};

    items.forEach(([address, type]) => {
      if (!dictionary[type]) {
        dictionary[type] = [];
      }
      dictionary[type].push([address, type]);
    });

    return dictionary;
  };

  const imagesDictionary = imagesToShow
    ? createDictionaryByType(imagesToShow)
    : {};

  const wallCladdingImages = imagesDictionary["Wall Cladding"];
  const railing = imagesDictionary["Railing"];
  const slidingDoorImages = imagesDictionary["Sliding Door"];
  const shower = imagesDictionary["Shower"];
  const wardrobe = imagesDictionary["Wardrobe"];
  const mirror = imagesDictionary["Mirror"];
  const swingDoor = imagesDictionary["Swing Door"];

  return (
    <>
      <div
        className={`bg-black h-screen ${
          !showImage ? "hidden" : "flex fixed"
        } w-screen z-10 md:p-20 justify-center items-center`}
      >
        <button
          className="fixed top-6 left-10 z-[11] btn btn-neutral"
          onClick={() => {
            setShowImage(!showImage);
          }}
        >
          Close
        </button>
        <img
          src={selectedImage}
          alt=""
          className="w-full md:h-full object-contain"
        />
      </div>
      <Header />
      <div className="flex bg-[url('/bg.jpg')] min-h-screen bg-fixed bg-no-repeat bg-cover">
        <div className="flex lg:mt-[10px] justify-center w-full items-center flex-col">
          <div className="flex w-full">
            <p className="text-[30px] font-bold">{site?.siteName}</p>
          </div>
          <div className="w-full h-[400px] lg:h-[700px] flex gap-4 pl-[10px] pr-[10px] flex-wrap">
            <div className="flex flex-col">
              {wallCladdingImages && wallCladdingImages.length && (
                <p className="font-bold text-[20px]">Wall Cladding</p>
              )}
              {wallCladdingImages && wallCladdingImages.length && (
                <div className="flex flex-wrap gap-2">
                  {wallCladdingImages?.map((item) => {
                    return (
                      <>
                        <img
                          src={`/api${item[0]}`}
                          alt="..."
                          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center rounded-[30px] transition-transform duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedImage(`/api${item[0]}`);
                            setShowImage(!showImage);
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {shower && shower.length && (
                <p className="font-bold text-[20px]"> Shower</p>
              )}
              {shower && shower.length && (
                <div className="flex flex-wrap gap-2">
                  {shower?.map((item) => {
                    return (
                      <>
                        <img
                          src={`/api${item[0]}`}
                          alt="..."
                          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedImage(`/api${item[0]}`);
                            setShowImage(!showImage);
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {swingDoor && swingDoor.length && (
                <p className="font-bold text-[20px]">Swing Door</p>
              )}
              {swingDoor && swingDoor.length && (
                <div className="flex flex-wrap gap-2">
                  {swingDoor?.map((item) => {
                    return (
                      <>
                        <img
                          src={`/api${item[0]}`}
                          alt="..."
                          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedImage(`/api${item[0]}`);
                            setShowImage(!showImage);
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {slidingDoorImages && slidingDoorImages.length && (
                <p className="font-bold text-[20px]">Sliding Door</p>
              )}
              {slidingDoorImages && slidingDoorImages.length && (
                <div className="flex flex-wrap gap-2">
                  {slidingDoorImages?.map((item) => {
                    return (
                      <>
                        <img
                          src={`/api${item[0]}`}
                          alt="..."
                          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedImage(`/api${item[0]}`);
                            setShowImage(!showImage);
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {railing && railing.length && (
                <p className="font-bold text-[20px]">Railing</p>
              )}
              {railing && railing.length && (
                <div className="flex flex-wrap gap-2">
                  {railing?.map((item) => {
                    return (
                      <>
                        <img
                          src={`/api${item[0]}`}
                          alt="..."
                          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedImage(`/api${item[0]}`);
                            setShowImage(!showImage);
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {wardrobe && wardrobe.length && (
                <p className="font-bold text-[20px]">Wardrobe</p>
              )}
              {wardrobe && wardrobe.length && (
                <div className="flex flex-wrap gap-2">
                  {wardrobe?.map((item) => {
                    return (
                      <>
                        <img
                          src={`/api${item[0]}`}
                          alt="..."
                          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedImage(`/api${item[0]}`);
                            setShowImage(!showImage);
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {mirror && mirror.length && (
                <p className="font-bold text-[20px]">Mirror</p>
              )}
              {mirror && mirror.length && (
                <div className="flex flex-wrap gap-2">
                  {mirror?.map((item) => {
                    return (
                      <>
                        <img
                          src={`/api${item[0]}`}
                          alt="..."
                          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105"
                          onClick={() => {
                            setSelectedImage(`/api${item[0]}`);
                            setShowImage(!showImage);
                          }}
                        />
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
