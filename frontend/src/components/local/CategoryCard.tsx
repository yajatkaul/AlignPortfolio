"use client";
import { useRouter } from "next/navigation";

const CategoryCard = ({ name }: any) => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center cursor-pointer transition-transform duration-300 hover:scale-105">
      <img src={`/CoverImg/${name}.jpg`} alt="" className="max-w-[300px]" />
      <div>{name}</div>
      <button
        className="btn btn-wide"
        onClick={() => {
          router.push(`/home/${name}`);
        }}
      >
        Check Out
      </button>
    </div>
  );
};

export default CategoryCard;
