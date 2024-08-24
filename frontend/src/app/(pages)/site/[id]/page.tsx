"use client";
import Header from "@/components/local/Header";
import React from "react";
import { Carousel } from "flowbite-react";

const Page = () => {
  return (
    <>
      <Header />
      <div className="flex w-screen bg-[url('/bg.jpg')] min-h-screen bg-fixed bg-no-repeat bg-cover">
        <div className="flex mt-[110px] justify-center w-full">
          <div className="w-[1700px] h-[700px]">
            <Carousel>
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                alt="..."
              />
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                alt="..."
              />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
