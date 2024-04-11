import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { GET_USERS } from "../action-type/Action";
export const getUser = createAsyncThunk( GET_USERS.get_users, async () => {
    try {
      const response = await axios.get('http://localhost:4441/api/v1/users');
      console.log("Get API response of users =>", response.data);
      return response.data
    } catch (error) {
      console.log("ERROR IN Order GET API", error);
    }
  })

  