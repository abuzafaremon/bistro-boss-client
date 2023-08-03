const SectionHeader = ({ title, subTitle }) => {
  return (
    <div className="text-center pb-12">
      <p className="text-xl text-[#ffa300] mb-4">{subTitle}</p>
      <h2 className="text-xl sm:text-2xl md:text-4xl py-5 px-20 border-t-2 border-b-2 inline-block uppercase">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
