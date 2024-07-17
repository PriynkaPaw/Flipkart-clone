import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { postUserDetails } from "../../reducer/adminReducer";
function CreateUsers() {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}

export default CreateUsers;

function RegistrationForm() {
  const navigat = useNavigate();
  const [formError, setFormError] = useState({});
  const [role, setRole] = useState([]);
  const [isSubmit, setIsSubmit] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    role: "",
    street: "",
    apartment: "",
    zip: "",
    country: "",
  });

  const dispatch = useDispatch();

  const getRolesList = useSelector((state) => state.addRole?.role);

  useEffect(() => {
    setRole(getRolesList);
  }, []);
  const handleFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    console.log("formdata ", formData.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = { ...formData };
    console.log("Regitered FormData  ", formData);
    setFormError(validate(newRecord));

    setFormData({ ...formData, newRecord });
    if (!newRecord.password) {
      setFormError((prevErrors) => ({
        ...prevErrors,
        password: "password is required",
      }));
      return; // Stop further execution if password is missing
    }
    dispatch(postUserDetails(newRecord));

    setIsSubmit("User Created SuccessFully !!");
    navigat("/admin");
  };

  const validate = (values) => {
    const error = {};

    if (!values.name) {
      error.name = "name is required";
    }
    if (!values.email) {
      error.email = "email is required";
    }
    if (!values.phone) {
      error.phone = "phone is required";
    }
    if (!values.city) {
      error.city = "city is required";
    }
    if (!values.street) {
      error.street = "street is required";
    }
    if (!values.apartment) {
      error.apartment = "apartment is required";
    }

    if (!values.zip) {
      error.zip = "zip is required";
    }
    if (!values.country) {
      error.country = "country is required";
    }
    if (!values.password) {
      error.password = "password is required";
    }

    return error;
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-100">
      {isSubmit}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-[100px]">
        {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-500">
                    <img className="w-12 h-16 mr-2" src={logo} alt="logo" />
                    Shopping Site
                </a> */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-400 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create and account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleFormData}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter name"
                  required=""
                />
                <p className="text-red-500"> {formError.name} </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleFormData}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
                <p className="text-red-500"> {formError.email} </p>
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={handleFormData}
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="999999999"
                  required=""
                />
                <p className="text-red-500"> {formError.phone} </p>
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Street
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={handleFormData}
                  name="street"
                  id="street"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required=""
                />
                <p className="text-red-500"> {formError.street} </p>
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Apartment
                </label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={handleFormData}
                  name="apartment"
                  id="apartment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ex-202"
                  required=""
                />

                <p className="text-red-500"> {formError.apartment} </p>
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Zip
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleFormData}
                  id="zip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ex-46000"
                  required=""
                />
                <p className="text-red-500"> {formError.zip} </p>
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormData}
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ex-Indore"
                  required=""
                />
                <p className="text-red-500"> {formError.city} </p>
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormData}
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ex-India "
                  required=""
                />
                <p className="text-red-500"> {formError.country} </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormData}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p className="text-red-500"> {formError.password} </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.role}
                  onChange={handleFormData}
                >
                  <option value="">Select a role...</option>
                  {role?.map((roleData, index) => (
                    <option
                      className="text-red-400"
                      key={index}
                      value={roleData?.data?.role_name}
                    >
                      {roleData?.data?.role_name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-green-600"
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
