const SectionHeader = ({ title, subTitle }) => {
  return (
    <div className="text-center pb-12">
      <p className="text-xl text-[#D99904] mb-4">{subTitle}</p>
      <h2 className="text-xl sm:text-2xl md:text-4xl text-[#151515] py-5 px-20 border-t-2 border-b-2 inline-block uppercase">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
