import SectionHeader from "../../../components/Shared/SectionHeader/SectionHeader";

const Featured = () => {
  const featuredImg = "/assets/images/home/featured.jpg";
  return (
    <section
      className={`bg-[url('${featuredImg}')] bg-no-repeat bg-cover bg-fixed`}
    >
      <div className="bg-black bg-opacity-60 text-white py-10 lg:py-20 px-2 lg:px-0">
        <div className="container mx-auto">
          <SectionHeader subTitle="---Check it out---" title="FROM OUR MENU" />
          <div className="max-w-screen-lg mx-auto md:flex justify-center items-center gap-10 lg:gap-14">
            <div className="w-full">
              <img className="w-full" src={featuredImg} alt="featured" />
            </div>
            <div className="w-full">
              <p className="text-lg">March 20, 2023</p>
              <p className="uppercase text-xl">WHERE CAN I GET SOME?</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                voluptate facere, deserunt dolores maiores quod nobis quas
                quasi. Eaque repellat recusandae ad laudantium tempore
                consequatur consequuntur omnis ullam maxime tenetur.
              </p>
              <button className="mt-4 uppercase text-white border-b-[3px] border-b-white lg:text-xl font-medium hover:bg-[#1F2937] px-3 lg:px-5 py-2 rounded-lg transition-all">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
