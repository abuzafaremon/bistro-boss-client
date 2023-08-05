import { Helmet } from "react-helmet-async";
import SectionIntro from "../../components/Shared/SectionIntro/SectionIntro";

const Menu = () => {
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
    </>
  );
};

export default Menu;
