const ItemCard = ({ item }) => {
  const { image, name, recipe } = item;
  return (
    <div className="card card-compact max-w-[400px] bg-[#F3F3F3] shadow lg:shadow-lg">
      <figure>
        <img className="w-full" src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{name}</h2>
        <p className="text-center mb-3">
          {recipe?.split(" ").slice(0, 9).join(" ")}
        </p>
        <div className="card-actions justify-center">
          <button className="uppercase text-[#ffa300] border-b-[3px] border-b-[#ffa300] lg:text-xl font-medium bg-[#E8E8E8] hover:bg-[#1F2937] px-3 lg:px-5 py-2 rounded-lg transition-all">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
