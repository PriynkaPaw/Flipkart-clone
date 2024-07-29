import {
  GET_USERS_CREATED_BY_ADMIN,
  POST_USERS_CREATED_BY_ADMIN,
  DELETE_ROLE,
  GET_PERMISSION,
  ADD_PERMISSION,
  DELETE_USERS_CREATED_BY_ADMIN,
  ADD_ROLE,
  DELETE_PERMISSION,
} from "../action-type/Action";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all users created by admin
export const getCreatedUsers = createAsyncThunk(
  GET_USERS_CREATED_BY_ADMIN.get_users,
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4441/api/v1/admin/createuser"
      );
      console.log("Get API response =>", response.data);
      return response.data;
    } catch (error) {
      console.log("ERROR IN PRODUCT GET API", error);
      throw error;
    }
  }
);

// post user details

export const postUserDetails = createAsyncThunk(
  POST_USERS_CREATED_BY_ADMIN.post_users,
  async (val) => {
    try {
      const response = await fetch(
        "http://localhost:4441/api/v1/admin/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(val),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Post Catch Error ", error);
      throw error;
    }
  }
);

//     Detele users

export const deleteUser = createAsyncThunk(
  DELETE_USERS_CREATED_BY_ADMIN.delete_users,
  async (val) => {
    try {
      const response = await axios.delete(
        `http://localhost:4441/api/v1/admin/createuser/${val.id}`
      );
      console.log("deleted data =>", response.data);
      return val;
    } catch (error) {
      console.log("ERROR IN Delete GET API", error);
      throw error;
    }
  }
);

//Post Permissions
export const addPermission = createAsyncThunk(
  ADD_PERMISSION.add_permission,
  async (val) => {
    try {
      const response = await fetch(
        "http://localhost:4441/api/v1/admin/add-permission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(val),
        }
      );
      const data = await response.json();
      console.log("Form Data Res ------------->", data);
      return data;
    } catch (error) {
      console.log("Post Catch Error ", error);
      throw error;
    }
  }
);

// Get all Permissions

export const getPermissions = createAsyncThunk(
  GET_PERMISSION.get_permission,
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4441/api/v1/admin/fetch-permissions"
      );
      console.log("Get API responseget permissssssion=>", response.data);
      return response.data;
    } catch (error) {
      console.log("ERROR IN PRODUCT GET API", error);
      throw error;
    }
  }
);

// Delete Permissions

export const deletePermission = createAsyncThunk(
  DELETE_PERMISSION.delete_permission,
  async (val) => {
    try {
      await axios.delete(
        `http://localhost:4441/api/v1/admin/delete-permission/${val._id}`
      );
      console.log("deleted data =>", val);
      return val;
    } catch (error) {
      console.log("Value", val);
      console.log("ERROR IN Delete API", error);
      throw error;
    }
  }
);

// Post Roles

export const addRoles = createAsyncThunk(ADD_ROLE.add_role, async (val) => {
  try {
    const response = await fetch(
      "http://localhost:4441/api/v1/admin/add-role",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(val),
      }
    );
    const data = await response.json();
    console.log("Form Data Res ------------->", data);
    return data;
  } catch (error) {
    console.log("Post Catch Error ", error);
    throw error;
  }
});

// Delete Roles

export const deleteRoles = createAsyncThunk(
  DELETE_ROLE.delete_role,
  async (val) => {
    try {
      await axios.delete(
        `http://localhost:4441/api/v1/admin/delete-role/${val._id}`
      );
      console.log("deleted data =>", val);
      return val;
    } catch (error) {
      console.log("Value", val);
      console.log("ERROR IN Delete API", error);
      throw error;
    }
  }
);
