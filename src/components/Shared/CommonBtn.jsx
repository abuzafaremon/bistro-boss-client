import { Link } from "react-router-dom";

const CommonBtn = ({ text = "Order Your Favorite Food", link }) => {
  return (
    <div className="text-center mt-5">
      <Link
        className="inline-block text-sm md:text-base lg:text-xl font-medium border-b-2 rounded-lg py-1 lg:py-1.5 px-7 border-b-[#1F2937] hover:bg-[#1F2937] transition-all hover:text-white uppercase"
        to={`/${link}`}
      >
        {text}
      </Link>
    </div>
  );
};

export default CommonBtn;
