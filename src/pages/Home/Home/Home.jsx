import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import SectionIntro from "../../../components/Shared/SectionIntro/SectionIntro";
import PopularMenu from "../PopularMenu/PopularMenu";
import ContactNumber from "../ContactNumber/ContactNumber";
import RecommendedItems from "../RecommendedItems/RecommendedItems";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner />
      <Category />
      <div className="max-w-screen-lg mx-auto">
        <SectionIntro
          bgImg={"/assets/images/home/chef-service.jpg"}
          bg="white"
          bgOpacity="bg-opacity-100"
          textClr="#151515"
          title="Bistro Boss"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo."
        />
      </div>
      <PopularMenu />
      <ContactNumber />
      <RecommendedItems />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;
