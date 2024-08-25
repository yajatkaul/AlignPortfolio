// @ts-nocheck
"use client";
import Card from "@/components/local/Card";
import Header from "@/components/local/Header";
import useGetSites from "@/hooks/useGetSites";
import { Filter } from "lucide-react";
import toggleButtons from "../json/toggleButtons.json";
import { useState } from "react";

const Page = () => {
  const { loading, sites } = useGetSites();
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (item: string) => {
    setSelectedButtons((prevSelectedButtons) =>
      prevSelectedButtons.includes(item)
        ? prevSelectedButtons.filter((button) => button !== item)
        : [...prevSelectedButtons, item]
    );
  };

  return (
    <>
      <Header />
      <div className="flex w-screen bg-[url('/bg.jpg')] min-h-screen bg-fixed bg-no-repeat bg-cover">
        <details className="dropdown mt-[110px] fixed left-9 md:left-12">
          <summary className="btn m-1">
            <Filter /> Filters
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-[300px] p-2 shadow">
            <div className="flex flex-wrap">
              {toggleButtons.items.map((item) => {
                const isSelected = selectedButtons.includes(item);

                return (
                  <button
                    key={item}
                    className={`btn ${
                      isSelected
                        ? "bg-[#e0d4c4] hover:bg-[#9b8f8f]"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleButtonClick(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </ul>
        </details>
        <div className="mt-[120px] w-full flex flex-wrap gap-4 pl-[40px] pr-[40px]">
          {sites?.map((item) => {
            return (
              <>
                <Card
                  key={item._id}
                  siteName={item.siteName}
                  image={item.items[0]}
                  tags={item.items}
                  id={item._id}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Page;
