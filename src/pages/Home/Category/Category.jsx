import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";

const Category = () => {
  const images = [
    { img: "/assets/images/home/itemSlide/slide1.jpg", legend: "salads" },
    { img: "/assets/images/home/itemSlide/slide2.jpg", legend: "pizzas" },
    { img: "/assets/images/home/itemSlide/slide3.jpg", legend: "soups" },
    { img: "/assets/images/home/itemSlide/slide1.jpg", legend: "salads" },
    { img: "/assets/images/home/itemSlide/slide2.jpg", legend: "pizzas" },
    { img: "/assets/images/home/itemSlide/slide4.jpg", legend: "deserts" },
  ];

  return (
    <section className="max-w-screen-lg mx-auto itemSlide px-2 lg:px-0 py-10">
      <div className="container mx-auto">
        <SectionHeader
          subTitle={"---From 11:00am to 10:00pm---"}
          title={"ORDER ONLINE"}
        />
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          centerMode
          centerSlidePercentage={25}
          swipeable
        >
          {images.map((image, i) => (
            <div key={i}>
              <img src={image.img} alt={`slider${i}`} />
              <Link
                to={image.legend}
                className="legend text-3xl text-white uppercase"
              >
                {image.legend}
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Category;
