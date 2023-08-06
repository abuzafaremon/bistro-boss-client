import MenuItem from "./MenuItem/MenuItem";

const ItemsMapping = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
      {items.map((item) => (
        <MenuItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ItemsMapping;
