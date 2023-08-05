const SectionIntro = ({
  bgImg,
  title,
  text,
  bg = "black",
  bgOpacity = "bg-opacity-50",
  textClr = "white",
  titleSize = "text-3xl md:text-4xl",
}) => {
  return (
    <section className={`bg-[url("${bgImg}")] bg-no-repeat bg-cover`}>
      <div className="container mx-auto">
        <div className="py-10 md:py-[120px] px-2 sm:px-8 md:px-28">
          <div
            className={`bg-${bg} ${bgOpacity} text-${textClr} text-center px-[8%] lg:px-[12%] py-[6%] lg:py-[8%]`}
          >
            <h2 className={`${titleSize} mb-2`}>{title}</h2>
            <p className="text-sm md:text-base">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionIntro;
