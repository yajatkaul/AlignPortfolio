// @ts-nocheck
"use client";
import Header from "@/components/local/Header";
import React from "react";
import { Carousel } from "flowbite-react";
import useGetSite from "@/hooks/useGetSite";

const Page = ({ params }: { params: { id: string } }) => {
  const { loading, site } = useGetSite(params.id);

  console.log(site);
  return (
    <>
      <Header />
      <div className="flex w-screen bg-[url('/bg.jpg')] min-h-screen bg-fixed bg-no-repeat bg-cover">
        <div className="flex lg:mt-[100px] justify-center w-full items-center">
          <div className="lg:w-[1700px] lg:h-[700px]">
            <Carousel>
              {site?.items.map((item) => {
                return (
                  <>
                    <img
                      src={`/api${item[0]}`}
                      alt="..."
                      className="w-full h-full object-cover"
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
