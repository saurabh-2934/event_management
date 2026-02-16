import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const onchangeName = (event) => {
    setName(event.target.value);
  };

  const onchangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onchangePass = (event) => {
    setPassword(event.target.value);
  };

  const onCreateUser = async (event) => {
    event.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}/register`;
      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(false);
      }
    } catch (err) {
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
      {isSuccess ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-100">
          <h1 className="text-center text-3xl font-bold">Account created</h1>
          <p className="text-center text-sm text-blue-600 cursor-pointer underline">
            <Link to="/login">login</Link>
          </p>
        </div>
      ) : (
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-100"
          onSubmit={onCreateUser}>
          <h1 className="text-3xl font-bold text-center mb-6">SignUp</h1>
          <div className="mb-4">
            <label className="text-xl font-bold text-gray-500" htmlFor="name">
              name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="enter your name"
              className="w-full mt-1 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={onchangeName}
            />
          </div>
          <div className="mb-4">
            <label className="text-xl font-bold text-gray-500" htmlFor="email">
              email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="enter your email"
              className="w-full mt-1 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={onchangeEmail}
            />
          </div>

          <div className="mb-4">
            <label
              className="text-xl font-bold text-gray-500"
              htmlFor="password">
              password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="enter your password"
              className="w-full mt-2 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={onchangePass}
            />
          </div>
          <button
            type="submit"
            className="w-full mb-1 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200">
            SignUp
          </button>
          {isError && (
            <p className="text-sm text-red-500 font-medium">{errorMsg}</p>
          )}

          <p className="text-center text-sm text-blue-600 cursor-pointer underline">
            <Link to="/login">login</Link>
          </p>
        </form>
      )}
    </div>
  );
}

export default SignUp;
