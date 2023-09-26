import React, { useState, useEffect } from "react";
import { Form, useNavigate, Link } from "react-router-dom";
import { FormField, Loader } from "../components";
import { useForm } from "../hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { userActions} from "../store/slices/userSlice";

import { getEmptyUser } from "../utils";

const Login = () => {
  const [user, handleChange, setUser] = useForm({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [warning, setWarning] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await getEmptyUser();
    setUser(user);
  };

  const OnLogin = async (e) => {
    e.preventDefault();
    try {
      if (!user.password || !user.username) {
        setWarning(true);
        user.password = "";
        setTimeout(() => {
          setWarning(false);
        }, 3000);
        return;
      }
      const userLogin = dispatch(userActions.login(user));
      userLogin ? navigate("/create-post") : null;
    } catch (error) {
      setWarning(true);
    }
  };

  if (!user) return <span> loading..</span>;
  return (
    <section className="max-w-3xl mx-auto">
      <div>
        <h2 className="font-bold text-[#222328] text-[32px]">Login</h2>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Login your account and start gerete images through by DALL-E AI ans
          share them{" "}
        </p>
      </div>
      <form className="mt-16 max-w-2xl" onSubmit={OnLogin}>
        <div className="flex flex-col gap-5">
          <label htmlFor="username">
            Your name
            <input
              onChange={handleChange}
              value={user.username}
              type="text"
              name="username"
              id="username"
              placeholder="Enter your name"
              className="bg-grat-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus;ring-[#4649ff] focus:border-[$4649ff] outline-none block w-full p-3"
            />
          </label>
          <label htmlFor="password">
            Your password
            <input
              onChange={handleChange}
              value={user.password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-grat-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus;ring-[#4649ff] focus:border-[$4649ff] outline-none block w-full p-3"
            />
          </label>
          <button className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Login
          </button>
        </div>
      </form>
      <div className="mt-5 flex flex-col gap-1 max-w-2xl">
        <p className="mt-2 text-[#666e75] text-[14px]">
          didn't have account yet?
        </p>
        <Link
          to="/signup"
          className="mt-2 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Signup
        </Link>
      </div>
    </section>
  );
};

export default Login;
