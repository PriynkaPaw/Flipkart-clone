import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../auth/authContext";

function Login() {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [islogin, setIsLogin] = useState("");
  const [record, setrecord] = useState([]);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormdata((prevFormdata) => ({ ...prevFormdata, [name]: value }));
  };
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = { ...formData };

    setrecord({ ...record, newRecord });

    setFormError(validate(newRecord));
    setIsSubmit(true);

    try {
      await fetch("http://localhost:4441/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Include the form data here
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setIsLogin("User Not Found, Please check Id and password");
          } else {
            const data = true;

            localStorage.setItem("userId", res.userID);
            localStorage.setItem("islogin", data);
            localStorage.setItem("role", res.role);
            setIsLogin("");
            navigate("/");
          }
        });
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formData);
    }
  }, [formError]);

  const validate = (values) => {
    const error = {};

    if (!values.email) {
      error.email = " email is Required";
    }

    if (!values.password) {
      error.password = "Password is required";
    }

    return error;
  };
  return (
    <>
      {/* <PostApi /> */}
      <div className="bg-zinc-500 h-[500px] w-[380px] center m-[100px] ml-[700px] p-4  rounded-md">
        <p className="text-red-500">{islogin}</p>
        <h1 className="text-2xl text-teal-800 pt-[12px]   font-bold"> LogIn</h1>

        <form onSubmit={handleSubmit} className="pt-[80px] ml-6">
          <p className="text-xl pb-[4px]">Email</p>
          <input
            className="p-1"
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />{" "}
          <br />
          <p className="text-red-500"> {formError.email} </p>
          <p className="pt-[15px] pb-[4px] text-xl">Password</p>
          <input
            className="p-1"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />{" "}
          <br /> <br />
          <p className="text-red-500"> {formError.password} </p>
          <button
            onClick={login}
            className="bg-blue-400 text-xl rounded-md h-[36px] w-[80px] pt-[4px]"
          >
            Login
          </button>
        </form>

        <p className="text-l pt-4">
          Does not have an account ?{" "}
          <Link className="text-red-400" to="/register">
            Sign Up
          </Link>{" "}
        </p>

        {/* <Link to='/login/user'>User</Link> */}
      </div>
    </>
  );
}

export default Login;
