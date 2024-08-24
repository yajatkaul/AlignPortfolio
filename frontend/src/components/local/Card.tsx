// @ts-nocheck

const Card = ({ siteName, image }) => {
  return (
    <div className="max-w-[400px]">
      <div className="flex flex-col justify-center items-center">
        <img src={`/api${image[0]}`} alt="" />
        <p>{siteName}</p>
      </div>
    </div>
  );
};

export default Card;
