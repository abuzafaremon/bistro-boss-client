import { Carousel } from "react-responsive-carousel";
import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";
import { FaQuoteLeft } from "react-icons/fa";

//rating resources
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const customStyles = {
  itemShapes: RoundedStar,
  activeFillColor: ["#e7040f", "#ff6300", "#ffde37", "#61bb00", "#19a974"],
  inactiveFillColor: "lightgray",
};

const Testimonials = () => {
  const [axiosSecure] = useAxiosSecure();

  // useEffect(() => {
  //   fetch("https://bistro-boss-server-abuzafaremon.vercel.app/reviews")
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data));
  // }, []);

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure("/reviews");
      return res.data;
    },
  });

  return (
    <section className="py-10 px-2 lg:px-0 max-w-screen-lg mx-auto">
      <div className="container mx-auto">
        <SectionHeader
          subTitle="---What Our Clients Say---"
          title="Testimonials"
        />
        <div className="testimonials">
          {/* import carousel */}
          <Carousel
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            autoPlay
            infiniteLoop
          >
            {reviews?.map(({ _id, details, name, rating }) => (
              <div key={_id}>
                <div className="flex justify-center py-2 text-4xl">
                  <FaQuoteLeft />
                </div>
                <p className="px-8">{details}</p>
                {/* import rating */}
                <Rating
                  style={{ maxWidth: 200, margin: "10px auto" }}
                  value={rating}
                  readOnly
                  itemStyles={customStyles}
                  spaceBetween="small"
                  spaceInside="medium"
                />
                <h3 className="text-[#ffa300] text-xl md:text-2xl">{name}</h3>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
