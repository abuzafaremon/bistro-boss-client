import useMenu from "./useMenu";

const useItems = () => {
  const [menu] = useMenu();
  const offered = menu?.filter((d) => d.category === "offered");
  const desserts = menu?.filter((d) => d.category === "dessert");
  const pizzas = menu?.filter((d) => d.category === "pizza");
  const salads = menu?.filter((d) => d.category === "salad");
  const soups = menu?.filter((d) => d.category === "soup");
  const drinks = menu?.filter((d) => d.category === "drinks");
  return [desserts, pizzas, salads, soups, drinks, offered];
};
export default useItems;
