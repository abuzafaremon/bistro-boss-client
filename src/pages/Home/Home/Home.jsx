import About from "../About/About";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import FeaturedItems from "../FeaturedItems/FeaturedItems";
import PopularMenu from "../PopularMenu/PopularMenu";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <About />
      <PopularMenu />
      <FeaturedItems />
    </div>
  );
};

export default Home;
