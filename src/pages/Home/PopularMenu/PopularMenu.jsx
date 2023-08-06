import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import useMenu from "../../../hooks/useMenu";
import ItemsMapping from "../../../components/Shared/ItemsMapping";
import CommonBtn from "../../../components/Shared/CommonBtn";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popular = menu?.filter((d) => d.category === "popular");

  return (
    <section className="py-10 px-2 lg:px-0 max-w-screen-lg mx-auto">
      <div className="container mx-auto">
        <SectionHeader
          subTitle={"---Check it out---"}
          title={"FROM OUR MENU"}
        />
        <ItemsMapping items={popular} />
        <CommonBtn text="View Full Menu" link="menu" />
      </div>
    </section>
  );
};

export default PopularMenu;
