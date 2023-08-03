const SectionHeader = ({ title, subTitle }) => {
  return (
    <div className="text-center pb-5 md:pb-10 lg:pb-12">
      <p className="md:text-xl text-[#ffa300] mb-2 md:mb-4">{subTitle}</p>
      <h2 className="text-xl sm:text-2xl md:text-4xl py-2 sm:py-3 md:py-4 lg:py-5 px-12 md:px-14 lg:px-20 border-t-2 border-b-2 inline-block uppercase">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
