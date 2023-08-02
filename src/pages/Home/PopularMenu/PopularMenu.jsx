import { useEffect, useState } from "react";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import MenuItem from "../../../components/Shared/MenuItem/MenuItem";
import { Link } from "react-router-dom";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => setMenu(data.filter((d) => d.category === "popular")));
  }, []);

  return (
    <section className="py-10 px-2 lg:px-0 max-w-screen-lg mx-auto">
      <div className="container mx-auto">
        <SectionHeader
          subTitle={"---Check it out---"}
          title={"FROM OUR MENU"}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
          {menu.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
        <div className="text-center mt-5">
          <Link
            className="inline-block text-sm md:text-base lg:text-xl font-medium border-b-[3px] rounded-lg py-3 lg:py-4 px-7 border-b-[#1F2937] uppercase"
            to="/menu"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularMenu;
