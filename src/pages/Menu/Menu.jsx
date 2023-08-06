import { Helmet } from "react-helmet-async";
import SectionIntro from "../../components/Shared/SectionIntro/SectionIntro";
import Offered from "./Offered";
import useMenu from "../../hooks/useMenu";
import CommonSection from "./CommonSection";

const Menu = () => {
  const [menu] = useMenu();
  const offered = menu?.filter((d) => d.category === "offered");
  const deserts = menu?.filter((d) => d.category === "dessert");
  const pizzas = menu?.filter((d) => d.category === "pizza");
  const salads = menu?.filter((d) => d.category === "salad");
  const soups = menu?.filter((d) => d.category === "soup");
  const sectionArray = [
    { items: deserts, bgImg: "/assets/images/menu/dessert-bg.jpeg" },
    { items: pizzas, bgImg: "/assets/images/menu/pizza-bg.jpg" },
    { items: salads, bgImg: "/assets/images/menu/salad-bg.jpg" },
    { items: soups, bgImg: "/assets/images/menu/soup-bg.jpg" },
  ];
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <SectionIntro
        bg="black"
        titleSize="text-4xl md:text-5xl"
        bgImg={"/assets/images/menu/banner3.jpg"}
        title="OUR MENU"
        text="WOULD YOU LIKE TO TRY A DISH?"
      />
      <Offered offered={offered} />
      {sectionArray.map((section, i) => (
        <CommonSection key={i} items={section.items} bgImg={section.bgImg} />
      ))}
    </>
  );
};

export default Menu;
