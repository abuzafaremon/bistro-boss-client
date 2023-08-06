import { useEffect, useState } from "react";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import ItemCard from "../../../components/Shared/ItemCard";

const RecommendedItems = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => setFeatured(data?.slice(12, 15)));
  }, []);

  return (
    <section className="py-10 px-2 lg:px-0 max-w-screen-lg mx-auto">
      <div className="container mx-auto">
        <SectionHeader
          subTitle={"---Should Try---"}
          title={"CHEF RECOMMENDS"}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
          {featured.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedItems;
