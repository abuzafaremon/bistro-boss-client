import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import About from "../About/About";
import PopularMenu from "../PopularMenu/PopularMenu";
import ContactNumber from "../ContactNumber/ContactNumber";
import RecommendedItems from "../RecommendedItems/RecommendedItems";
import Featured from "../Featured/Featured";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <About />
      <PopularMenu />
      <ContactNumber />
      <RecommendedItems />
      <Featured />
    </div>
  );
};

export default Home;