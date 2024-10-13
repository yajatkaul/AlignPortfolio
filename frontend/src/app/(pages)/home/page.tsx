import CategoryCard from "@/components/local/CategoryCard";
import Header from "@/components/local/Header";

const Page = () => {
  return (
    <>
      <Header />
      <div className="flex w-screen bg-[url('/bg.jpg')] min-h-screen bg-fixed bg-no-repeat bg-cover pt-[100px]">
        <div className="flex justify-center items-center flex-wrap w-full gap-8">
          <CategoryCard name={"Sliding Door"} />
          <CategoryCard name={"Swing Door"} />
          <CategoryCard name={"Shower"} />
          <CategoryCard name={"Wardrobe"} />
          <CategoryCard name={"Railing"} />
          <CategoryCard name={"Mirror"} />
          <CategoryCard name={"Wall Cladding"} />
          <CategoryCard name={"Other"} />
        </div>
      </div>
    </>
  );
};

export default Page;
