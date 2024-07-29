import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPermission,
  deleteUser,
  deletePermission,
  addRoles,
  deleteRoles,
} from "../../reducer/adminReducer";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import CreateUsers from "./CreateUsers";
function Admin() {
  const [displayUsers, setDisplayUsers] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(false);
  const [displayPermission, setDisplayPermission] = useState(false);
  const [displayRole, setDisplayRole] = useState(false);

  const [permissionForm, setPermissionForm] = useState({
    permission_name: "",
  });

  const [roleForm, setRoleForm] = useState({
    role_name: "",
  });
  // toggles for displaying form then list
  const [toggle, setToggle] = useState("false");
  const [permissionCheck, setPermissionCheck] = useState("false");
  const [roleCheck, setRoleCheck] = useState("false");

  // All states for storing list of data
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  const productList = useSelector((state) => state.getProduct?.data);
  const userList = useSelector((state) => state.getCreatedUser?.data);
  const permissionList = useSelector((state) => state.getCreatedUser);
  const getpermissionList = useSelector(
    (state) => state.getPermissions?.permissions
  );
  const getRolesList = useSelector((state) => state.addRole?.role);

  const showUsers = () => {
    setDisplayUsers(true);
    setDisplayProducts(false);
    setDisplayPermission(false);
    setDisplayRole(false);
  };

  const showProducts = () => {
    setDisplayUsers(false);
    setDisplayPermission(false);
    setDisplayProducts(true);
    setDisplayRole(false);
  };

  const showPermissions = () => {
    setDisplayUsers(false);
    setDisplayPermission(true);
    setDisplayProducts(false);
    setDisplayRole(false);
  };

  const showRoles = () => {
    setDisplayUsers(false);
    setDisplayPermission(false);
    setDisplayProducts(false);
    setDisplayRole(true);
  };

  useEffect(() => {
    setProduct(productList);
  }, [productList]);

  const dispatch = useDispatch();

  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    dispatch(addPermission(permissionForm));

    setPermissionCheck("false");
  };

  const handleRoleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRoles(roleForm));

    setRoleCheck("false");
  };

  useEffect(() => {
    if (permissionList && Array.isArray(permissionList)) {
      setPermissions(permissionList);
    }
  }, [permissionList]);

  useEffect(() => {
    if (getRolesList && Array.isArray(getRolesList)) {
      setRoles(getRolesList);
    }
  }, [getRolesList]);

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  const addOnClickHandler = () => {
    setToggle("true");
  };

  const closeButtonHandler = () => {
    setToggle("false");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPermissionForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setRoleForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDelete = (item) => {
    dispatch(deleteUser(item));
  };

  const handleDeletePermission = (item) => {
    dispatch(deletePermission(item));
  };

  const handleDeleteRole = (item) => {
    dispatch(deleteRoles(item));
  };

  const handleAddPermission = () => {
    setPermissionCheck("true");
  };
  const handleAddRole = () => {
    setRoleCheck("true");
  };
  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64 flex flex-col">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          </div>
          <ul className="flex-1">
            <li>
              <a
                href="/"
                onClick={showUsers}
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                Users
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={showProducts}
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={showPermissions}
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                Permission
              </a>
            </li>
            <li>
              <a
                href="/"
                onClick={showRoles}
                className="block py-2 px-4 text-gray-300 hover:bg-gray-700"
              >
                Roles
              </a>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {/* Users list */}
          <div id="users" style={{ display: displayUsers ? "block" : "none" }}>
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            {/* Your users list goes here */}

            {toggle === "true" ? (
              <div className="bg-gray-100">
                <button
                  onClick={closeButtonHandler}
                  className="text-red-400 ml-[90%]"
                >
                  Close
                </button>
                <CreateUsers />
              </div>
            ) : (
              <>
                <Button
                  onClick={addOnClickHandler}
                  variant="contained"
                  color="success"
                  endIcon={<Add />}
                >
                  Add
                </Button>
                {users &&
                  users.map((item) => (
                    <div className="border h-[50px] flex mt-4">
                      <h1 className="text-blue-600 text-xl ml-2 mt-2">
                        {item?.name}
                      </h1>
                      <h1 className="text-pink-600 text-xl ml-[8%] mt-2">
                        {item?.role}
                      </h1>

                      <Button
                        sx={{ marginLeft: 8 }}
                        onClick={() => handleDelete(item)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* Products list */}
          <div
            id="products"
            style={{ display: displayProducts ? "block" : "none" }}
          >
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <ul>
              {product?.map((item) => (
                <div className="bg-gray-200 mb-2 h-[200px] mt-2 flex border border-gray-300">
                  <img
                    className="h-[150px] w-[150px] mt-6"
                    alt=""
                    src={item.image}
                  />
                  <div className="w-[350px] ml-8 mt-4">
                    <li>{item.name} </li>
                  </div>
                  <div className="ml-4 mt-4">
                    <li className="text-xl font-semibold">Price</li>
                    <li className="mt-2">{item.price} </li>
                  </div>
                  <div className="ml-12  mt-4 w-[350px]">
                    <li className="text-xl font-semibold">Description</li>
                    <li className="mt-2">{item.description} </li>
                  </div>
                  <div className="ml-6">
                    <button className="p-2 bg-blue-400 mt-6 rounded-[4px]">
                      View Seller Details
                    </button>
                  </div>
                  <div>
                    <button className="p-2 bg-green-500 mt-6 rounded-[4px] ml-8">
                      {" "}
                      Approve Product{" "}
                    </button>
                  </div>
                  <div>
                    <button className="p-2 bg-red-500 mt-6 rounded-[4px] ml-8">
                      Reject Product
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          {/* Permission list */}
          <div
            id="permission"
            style={{ display: displayPermission ? "block" : "none" }}
          >
            <h2 className="text-xl font-semibold mb-4">Permissions</h2>

            {permissionCheck === "true" ? (
              <div className="flex ">
                <h1>Add Permission :</h1>
                <input
                  className="ml-8 bg-gray-100 border border-gray-200 p-1 "
                  placeholder="permission name..."
                  name="permission_name"
                  value={permissionForm.permission_name}
                  onChange={handleChange}
                />
                <Button
                  sx={{ padding: 1, marginLeft: 3 }}
                  onClick={handlePermissionSubmit}
                  variant="contained"
                  color="success"
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={handleAddPermission}
                  variant="contained"
                  color="success"
                  endIcon={<Add />}
                >
                  Add Permission
                </Button>
                {/* {
                                        getpermissionList?.map((item) => (
                                            <li className='text-blue-300'>{item?.data?.permission_name}</li>

                                        ))
                                    } */}
                {getpermissionList &&
                  getpermissionList.map((item) => (
                    <div className="border h-[50px] flex mt-4">
                      <h1 className="text-blue-600 text-xl ml-2 mt-2">
                        {item?.data?.permission_name}
                      </h1>
                      <Button
                        sx={{ marginLeft: 8 }}
                        onClick={() => handleDeletePermission(item?.data)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
              </>
            )}
          </div>

          {/* Roles list */}
          <div id="role" style={{ display: displayRole ? "block" : "none" }}>
            <h2 className="text-xl font-semibold mb-4">Roles</h2>

            {roleCheck === "true" ? (
              <div className="flex ">
                <h1>Add Roles :</h1>
                <input
                  className="ml-8 bg-gray-100 border border-gray-200 p-1 "
                  placeholder="role name..."
                  name="role_name"
                  value={roleForm.role_name}
                  onChange={handleRoleChange}
                />
                <Button
                  sx={{ padding: 1, marginLeft: 3 }}
                  onClick={handleRoleSubmit}
                  variant="contained"
                  color="success"
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <Button
                  onClick={handleAddRole}
                  variant="contained"
                  color="success"
                  endIcon={<Add />}
                >
                  Add Role
                </Button>

                {roles &&
                  roles.map((item) => (
                    <div className="border h-[50px] flex mt-4">
                      <h1 className="text-blue-600 text-xl ml-2 mt-2">
                        {item?.data?.role_name}
                      </h1>
                      <Button
                        sx={{ marginLeft: 8 }}
                        onClick={() => handleDeleteRole(item?.data)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
