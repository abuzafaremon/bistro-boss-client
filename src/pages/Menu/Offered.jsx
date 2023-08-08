import CommonBtn from "../../components/Shared/CommonBtn";
import ItemsMapping from "../../components/Shared/ItemsMapping";
import SectionHeader from "../../components/Shared/SectionHeader/SectionHeader";

const Offered = ({ offered }) => {
  return (
    <section className="max-w-screen-lg mx-auto py-10 px-2 lg:px-0">
      <div className="container mx-auto">
        <SectionHeader subTitle="---Don't miss---" title="TODAY'S OFFER" />
        <ItemsMapping items={offered} />
        <CommonBtn link="shop/dessert" />
      </div>
    </section>
  );
};

export default Offered;
