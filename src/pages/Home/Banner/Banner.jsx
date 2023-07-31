import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const images = [
    { img: "/assets/images/home/01.jpg" },
    { img: "/assets/images/home/02.jpg" },
    { img: "/assets/images/home/03.png" },
    { img: "/assets/images/home/04.jpg" },
    { img: "/assets/images/home/05.png" },
    { img: "/assets/images/home/06.png" },
  ];
  return (
    <section>
      <Carousel>
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
