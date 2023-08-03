const MenuItem = ({ item }) => {
  const { image, name, recipe, price } = item;
  return (
    <div className="flex gap-x-3 lg:gap-5">
      <img
        className="w-[118px] h-[104px] rounded-b-full rounded-tr-full md:rounded-tr-none md:rounded-tl-full transition-all"
        src={image}
        alt={name}
      />
      <div>
        <h2 className="text-[#151515] text-xl">{name}</h2>
        <p className="text-[#737373] text-sm lg:text-base">{recipe}</p>
      </div>
      <h3 className="text-[#ffa300] text-xl">${price}</h3>
    </div>
  );
};

export default MenuItem;
