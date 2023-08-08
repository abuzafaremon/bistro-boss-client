import CommonBtn from "../../components/Shared/CommonBtn";
import ItemsMapping from "../../components/Shared/ItemsMapping";
import SectionIntro from "../../components/Shared/SectionIntro/SectionIntro";

const CommonSection = ({ items, bgImg }) => {
  return (
    <section>
      <SectionIntro
        bg="black"
        titleSize="text-3xl md:text-4xl"
        bgImg={bgImg}
        title={items[0]?.category}
        text={items[0]?.recipe}
      />
      <div className="max-w-screen-lg mx-auto py-10 px-2 lg:px-0">
        <div className="container">
          <ItemsMapping items={items} />
          <CommonBtn link={`shop/${items[0]?.category}`} />
        </div>
      </div>
    </section>
  );
};

export default CommonSection;
