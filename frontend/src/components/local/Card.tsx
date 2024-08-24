// @ts-nocheck

import { useRouter } from "next/navigation";

const Card = ({ siteName, image, id }) => {
  const router = useRouter();

  return (
    <div
      className="max-w-[350px] cursor-pointer"
      onClick={() => {
        router.push(`/site/${id}`);
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <img
          src={`/api${image[0]}`}
          alt=""
          className="w-[350px] h-[350px] object-cover"
        />
        <p>{siteName}</p>
      </div>
    </div>
  );
};

export default Card;
