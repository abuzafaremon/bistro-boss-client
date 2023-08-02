import About from "../About/About";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <About />
      <PopularMenu />
    </div>
  );
};

export default Home;
