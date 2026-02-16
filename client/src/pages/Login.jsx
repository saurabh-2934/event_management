import { useState, useContext } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";

function Login() {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePass = (event) => {
    setPassword(event.target.value);
  };

  const onClickLogin = async (event) => {
    event.preventDefault();

    try {
      const url = `${process.env.REACT_APP_API_URL}/login`;

      const response = await axios.post(url, {
        email,
        password,
      });

      login(response.data.user, response.data.jwtToken);
      navigate("/");
    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data.error_msg);
      setError(true);
      setErrorMsg(err.response?.data.error_msg);
    }
  };

  const token = Cookies.get("token");
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-coll items-center justify-center">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-100"
        onSubmit={onClickLogin}>
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <div className="mb-4">
          <label className="text-xl font-bold text-gray-500" htmlFor="email">
            email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            required
            placeholder="enter your email"
            className="w-full mt-1 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={onChangeEmail}
          />
        </div>

        <div className="mb-4">
          <label className="text-xl font-bold text-gray-500" htmlFor="password">
            password
          </label>
          <input
            type="password"
            id="password"
            required
            placeholder="enter your password"
            className="w-full mt-2 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={onChangePass}
          />
        </div>
        <button
          type="submit"
          className="w-full mb-1 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200">
          Login
        </button>
        {error && (
          <p className="text-sm text-red-500 font-medium">{errorMsg}*</p>
        )}

        <p className="text-center text-sm text-gray-600 cursor-pointer">
          <Link to="/create-account">
            create an account or{" "}
            <span className="text-blue-600 underline">singUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
