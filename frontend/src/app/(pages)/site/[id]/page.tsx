// @ts-nocheck
"use client";
import Header from "@/components/local/Header";
import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import useGetSite from "@/hooks/useGetSite";
import { useFilterContext } from "@/context/FilterContext";

const Page = ({ params }: { params: { id: string } }) => {
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

  return (
    <>
      <Header />
      <div className="flex w-screen bg-[url('/bg.jpg')] min-h-screen bg-fixed bg-no-repeat bg-cover">
        <div className="flex lg:mt-[10px] justify-center w-full items-center">
          <div className="w-full h-[400px] lg:h-[700px]">
            <Carousel>
              {imagesToShow?.map((item) => {
                return (
                  <>
                    <img
                      src={`/api${item[0]}`}
                      alt="..."
                      className="w-full h-full object-center object-cover"
                    />
                  </>
                );
              })}
            </Carousel>
            <div className="flex w-full">
              <p className="text-[30px] font-bold">{site?.siteName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
