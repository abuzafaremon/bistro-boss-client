import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h2 className="text-2xl absolute top-5 left-1/2 -translate-x-1/2">
        404 Not Found
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <Link
          className="btn btn-sm btn-outline border-t-0 border-l-0 border-r-0 border-b-2"
          to={-1}
        >
          Go Back
        </Link>
        <img src="/assets/images/404.gif" alt="404" />
      </div>
    </>
  );
};

export default NotFound;
