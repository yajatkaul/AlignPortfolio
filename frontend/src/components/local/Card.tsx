// @ts-nocheck

import { useRouter } from "next/navigation";
import { useState } from "react";

const Card = ({ siteName, image, id, tags }) => {
  const router = useRouter();
  tags = tags.map((tag) => tag[1]);

  return (
    <div
      className="max-w-[350px] cursor-pointer"
      onClick={() => {
        router.push(`/site/${id}`);
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <img
          src={`/api${image ? image[0] : ""}`}
          alt=""
          className="w-[350px] h-[350px] object-cover"
        />
        <p>{siteName}</p>
        <p>
          {tags.map((tag) => {
            return (
              <>
                <div className="badge bg-[#e0d4c4]">{tag}</div>
              </>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default Card;
