// @ts-nocheck
"use client";
import Header from "@/components/local/Header";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import useGetSite from "@/hooks/useGetSite";
import { useFilterContext } from "@/context/FilterContext";
import { MoveLeft, MoveRight, Trash2 } from "lucide-react";
import useRemoveSite from "@/hooks/useRemoveSite";
import { useAuthContext } from "@/context/AuthContext";

const Page = ({ params }: { params: { id: string } }) => {
  var totalImages;
  const { authUser } = useAuthContext();
  const { removeSite } = useRemoveSite(params.id);
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
    const indexToAddress = {};
    let imageIndex = 0; // Separate counter for images

    items.forEach(([address, type]) => {
      const fileExtension = address.split(".").pop();

      if (fileExtension !== "mp4" && fileExtension !== "mkv") {
        if (!dictionary[type]) {
          dictionary[type] = [];
        }

        // Push address, type, and index (using imageIndex) into dictionary
        dictionary[type].push([address, type, imageIndex]);

        // Map imageIndex to address
        indexToAddress[imageIndex] = address;

        // Increment imageIndex only for images
        imageIndex++;
      } else {
        // For videos, add without an index
        if (!dictionary[type]) {
          dictionary[type] = [];
        }
        dictionary[type].push([address, type]);
      }
    });
    totalImages = Object.keys(indexToAddress).length;
    //console.log(totalImages);
    return { dictionary, indexToAddress };
  };

  const { dictionary: imagesDictionary = {} } = imagesToShow
    ? createDictionaryByType(imagesToShow)
    : {};

  const { indexToAddress: mappingData = {} } = imagesToShow
    ? createDictionaryByType(imagesToShow)
    : {};

  const wallCladdingImages = imagesDictionary["Wall Cladding"];
  const railing = imagesDictionary["Railing"];
  const slidingDoorImages = imagesDictionary["Sliding Door"];
  const shower = imagesDictionary["Shower"];
  const wardrobe = imagesDictionary["Wardrobe"];
  const mirror = imagesDictionary["Mirror"];
  const swingDoor = imagesDictionary["Swing Door"];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" && selectedImage < totalImages - 1) {
        // Ensure selectedImage doesn't exceed the number of images
        setSelectedImage((prevSelectedImage) => prevSelectedImage + 1);
      } else if (event.key === "ArrowLeft") {
        setSelectedImage((prevSelectedImage) =>
          Math.max(prevSelectedImage - 1, 0)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, totalImages]);

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

        {/* Left Button to go to the previous image */}
        <button
          className="absolute left-2 md:left-10 z-[11] btn btn-neutral"
          onClick={() => {
            setSelectedImage((prevSelectedImage) =>
              Math.max(prevSelectedImage - 1, 0)
            );
          }}
        >
          <MoveLeft />
        </button>

        {/* Right Button to go to the next image */}
        <button
          className="absolute right-2 md:right-10 z-[11] btn btn-neutral"
          onClick={() => {
            if (selectedImage < totalImages - 1) {
              // Ensure selectedImage doesn't exceed the number of images
              setSelectedImage((prevSelectedImage) => prevSelectedImage + 1);
            }
          }}
        >
          <MoveRight />
        </button>

        {/* Image display */}
        <img
          src={`/api${mappingData[selectedImage]}`}
          alt="Selected"
          className="w-full md:h-full object-contain"
        />
      </div>
      <Header />
      <div className="flex">
        {/* Delete */}
        <div
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className={`${
            authUser.includes("Admin") ? "fixed" : "hidden"
          } right-[20px] bottom-[20px] bg-[#bb2b2b] w-[60px] h-[60px] flex justify-center items-center rounded-[20px] cursor-pointer`}
        >
          <Trash2 className="w-[40px] h-[40px]" />
        </div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-[30px]">Delete Warning</h3>
            <p className="py-4">Confirm to delete!!!??</p>
            <div className="flex justify-center items-center">
              <button
                className="btn hover:bg-[#bb2b2b]"
                onClick={() => {
                  removeSite();
                }}
              >
                Delete <Trash2 />
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* Delete */}
        <div className="flex md:mt-[95px] justify-center w-full items-center flex-col mt-[105px]">
          <div className="flex w-full">
            <p className="text-[30px] md:text-[50px] font-bold pl-[10px]">
              Site: {site?.siteName}
            </p>
          </div>
          <div className="w-full lg:h-[700px] flex gap-4 pl-[10px] pr-[10px] flex-wrap">
            {wallCladdingImages && wallCladdingImages.length && (
              <div className="flex flex-col">
                <p className="font-bold text-[20px]">Wall Cladding</p>
                <div className="flex flex-wrap gap-2">
                  {wallCladdingImages?.map((item) => {
                    const fileExtension = item[0].split(".").pop();
                    return (
                      <>
                        {fileExtension === "mp4" || fileExtension === "mkv" ? (
                          // Render video if the extension is mp4 or mkv
                          <video width="320" height="240" controls>
                            <source
                              src={`/api${item[0]}`}
                              type={`video/${fileExtension}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          // Render image if the file extension is not mp4 or mkv
                          <img
                            src={`/api${item[0]}`}
                            alt="..."
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => {
                              setSelectedImage(item[2]);
                              setShowImage(!showImage);
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {shower && shower.length && (
              <div className="flex flex-col">
                <p className="font-bold text-[20px]"> Shower</p>
                <div className="flex flex-wrap gap-2">
                  {shower?.map((item) => {
                    const fileExtension = item[0].split(".").pop();
                    return (
                      <>
                        {fileExtension === "mp4" || fileExtension === "mkv" ? (
                          // Render video if the extension is mp4 or mkv
                          <video width="320" height="240" controls>
                            <source
                              src={`/api${item[0]}`}
                              type={`video/${fileExtension}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          // Render image if the file extension is not mp4 or mkv
                          <img
                            src={`/api${item[0]}`}
                            alt="..."
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => {
                              setSelectedImage(item[2]);
                              setShowImage(!showImage);
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {swingDoor && swingDoor.length && (
              <div className="flex flex-col">
                <p className="font-bold text-[20px]">Swing Door</p>
                <div className="flex flex-wrap gap-2">
                  {swingDoor?.map((item) => {
                    const fileExtension = item[0].split(".").pop();
                    return (
                      <>
                        {fileExtension === "mp4" || fileExtension === "mkv" ? (
                          // Render video if the extension is mp4 or mkv
                          <video width="320" height="240" controls>
                            <source
                              src={`/api${item[0]}`}
                              type={`video/${fileExtension}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          // Render image if the file extension is not mp4 or mkv
                          <img
                            src={`/api${item[0]}`}
                            alt="..."
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => {
                              setSelectedImage(item[2]);
                              setShowImage(!showImage);
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {slidingDoorImages && slidingDoorImages.length && (
              <div className="flex flex-col">
                <p className="font-bold text-[20px]">Sliding Door</p>
                <div className="flex flex-wrap gap-2">
                  {slidingDoorImages?.map((item) => {
                    const fileExtension = item[0].split(".").pop();
                    return (
                      <>
                        {fileExtension === "mp4" || fileExtension === "mkv" ? (
                          // Render video if the extension is mp4 or mkv
                          <video width="320" height="240" controls>
                            <source
                              src={`/api${item[0]}`}
                              type={`video/${fileExtension}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          // Render image if the file extension is not mp4 or mkv
                          <img
                            src={`/api${item[0]}`}
                            alt="..."
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => {
                              setSelectedImage(item[2]);
                              setShowImage(!showImage);
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {railing && railing.length && (
              <div className="flex flex-col">
                <p className="font-bold text-[20px]">Railing</p>
                <div className="flex flex-wrap gap-2">
                  {railing?.map((item) => {
                    const fileExtension = item[0].split(".").pop();
                    return (
                      <>
                        {fileExtension === "mp4" || fileExtension === "mkv" ? (
                          // Render video if the extension is mp4 or mkv
                          <video width="320" height="240" controls>
                            <source
                              src={`/api${item[0]}`}
                              type={`video/${fileExtension}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          // Render image if the file extension is not mp4 or mkv
                          <img
                            src={`/api${item[0]}`}
                            alt="..."
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => {
                              setSelectedImage(item[2]);
                              setShowImage(!showImage);
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {wardrobe && wardrobe.length && (
              <div className="flex flex-col">
                <p className="font-bold text-[20px]">Wardrobe</p>
                <div className="flex flex-wrap gap-2">
                  {wardrobe?.map((item) => {
                    const fileExtension = item[0].split(".").pop();
                    return (
                      <>
                        {fileExtension === "mp4" || fileExtension === "mkv" ? (
                          // Render video if the extension is mp4 or mkv
                          <video width="320" height="240" controls>
                            <source
                              src={`/api${item[0]}`}
                              type={`video/${fileExtension}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          // Render image if the file extension is not mp4 or mkv
                          <img
                            src={`/api${item[0]}`}
                            alt="..."
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => {
                              setSelectedImage(item[2]);
                              setShowImage(!showImage);
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {mirror && mirror.length && (
              <div className="flex flex-col">
                <p className="font-bold text-[20px]">Mirror</p>
                <div className="flex flex-wrap gap-2">
                  {mirror?.map((item) => {
                    const fileExtension = item[0].split(".").pop();
                    return (
                      <>
                        {fileExtension === "mp4" || fileExtension === "mkv" ? (
                          // Render video if the extension is mp4 or mkv
                          <video width="320" height="240" controls>
                            <source
                              src={`/api${item[0]}`}
                              type={`video/${fileExtension}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          // Render image if the file extension is not mp4 or mkv
                          <img
                            src={`/api${item[0]}`}
                            alt="..."
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-center object-cover rounded-[30px] transition-transform duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => {
                              setSelectedImage(item[2]);
                              setShowImage(!showImage);
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
