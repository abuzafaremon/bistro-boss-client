import { Helmet } from "react-helmet-async";
import SectionIntro from "../../components/Shared/SectionIntro/SectionIntro";
import "./Shop.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ItemCard from "../../components/Shared/ItemCard";
import useItems from "../../hooks/useItems";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Shop = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex = 3, setTabIndex] = useState(initialIndex);
  const [desserts, pizzas, salads, soups, drinks] = useItems();
  const itemsArray = [salads, pizzas, soups, desserts, drinks];
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Shop</title>
      </Helmet>
      <SectionIntro
        bg="black"
        titleSize="text-4xl md:text-5xl"
        bgImg={"/assets/images/shop/shop-banner.jpg"}
        title="OUR SHOP"
        text="WOULD YOU LIKE TO TRY A DISH?"
      />
      <section className="py-10 px-2 lg:px-0 max-w-screen-lg mx-auto">
        <div className="container mx-auto">
          <div>
            <Tabs
              focusTabOnClick={false}
              defaultIndex={tabIndex}
              onSelect={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Salad</Tab>
                <Tab>Pizza</Tab>
                <Tab>Soup</Tab>
                <Tab>Dessert</Tab>
                <Tab>Drinks</Tab>
              </TabList>
              {itemsArray.map((items, i) => (
                <TabPanel key={i}>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 w-max sm:w-auto mx-auto">
                    {items.map((item) => (
                      <div className="relative" key={item._id}>
                        <p className="absolute top-2 right-2 z-10 bg-black text-white px-3 rounded">
                          ${item.price}
                        </p>
                        <ItemCard item={item} />
                      </div>
                    ))}
                  </div>
                </TabPanel>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
