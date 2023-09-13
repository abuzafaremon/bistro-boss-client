import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "https://bistro-boss-server-abuzafaremon.vercel.app",
  });

  useEffect(() => {
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const { response } = error;
        if (response && (response.status === 401 || response.status === 403)) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosSecure]);

  return [axiosSecure];
};

export default useAxiosSecure;
