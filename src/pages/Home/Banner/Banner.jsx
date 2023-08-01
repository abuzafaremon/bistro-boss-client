import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const images = [
    { img: "/assets/images/home/bannerSlide/02.png" },
    { img: "/assets/images/home/bannerSlide/01.png" },
    { img: "/assets/images/home/bannerSlide/03.png" },
    { img: "/assets/images/home/bannerSlide/04.png" },
    { img: "/assets/images/home/bannerSlide/05.png" },
    { img: "/assets/images/home/bannerSlide/06.png" },
  ];
  return (
    <section>
      <Carousel autoPlay infiniteLoop showStatus={false}>
        {images.map((image, i) => (
          <div key={i}>
            <img src={image.img} alt={`slider${i}`} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
