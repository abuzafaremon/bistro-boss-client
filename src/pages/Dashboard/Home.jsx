import {
  FaShoppingCart,
  FaStar,
  FaStore,
  FaTruck,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import useAuth from "../../hooks/useAuth";
import { BiSolidPhoneCall } from "react-icons/bi";
import useCart from "../../hooks/useCart";
import useBooking from "../../hooks/useBooking";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAdmin from "../../hooks/useAdmin";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

const Home = () => {
  const [isAdmin] = useAdmin();
  return <>{isAdmin ? <AdminHome /> : <UserHome />}</>;
};

export default Home;

const AdminHome = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: stats = {} } = useQuery(["admin-stats"], async () => {
    const res = await axiosSecure("/admin-stats");
    return res.data;
  });

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // pie chart data
  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const PIECOLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div>
      <h2 className="text-xl md:text-3xl mb-5 mt-5">
        Hi, {user?.displayName} Welcome Back!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="w-full bg-gradient-to-r from-purple-500 to-purple-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <FaWallet className="text-xl" />
            <div>
              <h3 className="text-3xl">{stats?.revenue}</h3>
              <span className="font-normal">Revenue</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-amber-600 to-amber-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <FaUsers className="text-xl" />
            <div>
              <h3 className="text-3xl">{stats?.users}</h3>
              <span className="font-normal">Customer</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-pink-500 to-pink-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <SiCodechef className="text-2xl" />
            <div>
              <h3 className="text-3xl">{stats?.products}</h3>
              <span className="font-normal">Products</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-blue-500 to-blue-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <FaTruck className="text-2xl" />
            <div>
              <h3 className="text-3xl">{stats?.orders}</h3>
              <span className="font-normal">Orders</span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 flex flex-col md:flex-row">
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="uv"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
        <PieChart width={300} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PIECOLORS[index % PIECOLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

const UserHome = () => {
  const { user } = useAuth();
  const [cart] = useCart();
  const [booking] = useBooking();
  const [axiosSecure] = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure(
        "https://bistro-boss-server-abuzafaremon.vercel.app/reviews"
      );
      return res.data;
    },
  });
  const myReviews = reviews.filter((review) => review.email === user?.email);

  return (
    <div>
      <h2 className="text-xl md:text-3xl mb-5 mt-5">
        Hi, {user?.displayName} Welcome Back!
      </h2>
      <div className="flex flex-col items-center md:flex-row gap-5">
        <div className="w-full bg-gradient-to-r from-purple-500 to-purple-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <FaWallet className="text-xl" />
            <div>
              <h3 className="text-3xl">205</h3>
              <span className="font-normal">Menu</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-amber-600 to-amber-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <FaStore className="text-xl" />
            <div>
              <h3 className="text-3xl">103</h3>
              <span className="font-normal">Shop</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-pink-500 to-pink-200 flex justify-center items-center rounded p-5">
          <div className="flex items-center gap-3 font-bold text-white">
            <BiSolidPhoneCall className="text-2xl" />
            <div>
              <h3 className="text-3xl">03</h3>
              <span className="font-normal">Contact</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:flex mt-5">
        <div className="py-16 px-10 w-full mx-auto bg-orange-200 flex flex-col gap-5 justify-center items-center">
          <img
            className="rounded-full w-48"
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <h2 className="uppercase text-3xl font-semibold">
            {user?.displayName}
          </h2>
        </div>
        <div className="py-16 px-10 w-full mx-auto bg-yellow-200">
          <h2 className="text-2xl md:text-4xl mb-5">Your Activities</h2>
          <div className="flex gap-3 items-center text-blue-500 font-semibold text-xl mb-2">
            <FaShoppingCart />
            <span>ORDERS: {cart?.length}</span>
          </div>
          <div className="flex gap-3 items-center text-green-500 font-semibold text-xl mb-2">
            <FaShoppingCart />
            <span>REVIEWS: {myReviews?.length}</span>
          </div>
          <div className="flex gap-3 items-center text-yellow-500 font-semibold text-xl mb-2">
            <FaStar />
            <span>BOOKING: {booking?.length}</span>
          </div>
          <div className="flex gap-3 items-center text-orange-700 font-semibold text-xl mb-2">
            <FaShoppingCart />
            <span>PAYMENT: 3</span>
          </div>
        </div>
      </div>
    </div>
  );
};
