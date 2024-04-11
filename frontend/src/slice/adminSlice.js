import { createSlice } from "@reduxjs/toolkit";
import { getCreatedUsers, postUserDetails, addPermission, getPermissions ,deleteRoles, deleteUser, deletePermission , addRoles} from "../reducer/adminReducer";

const initialState = {
    permissions: [], 
    data: [],
    role:[],
    error: null,
    isLoading: false
};

const usersSlice = createSlice({
    name: 'CreatedUsers', 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // post user details
            .addCase(postUserDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(postUserDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data.concat(action.payload);
            })
            .addCase(postUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // GET all Users created by admin details
            .addCase(getCreatedUsers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getCreatedUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getCreatedUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message; 
            })

            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log("State.data",state.data); 
                console.log("State.data22222",action);
                state.data = state.data.filter((user) => user?._id !== action.payload?.id);
                // console.log("fsdfsdffd",user)
                // state.data = [];
                })
                


            // Post Permissions
            .addCase(addPermission.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addPermission.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions = state.permissions?.concat(action.payload); // Updated to 'permissions'
            })
            .addCase(addPermission.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // GET all Permissions by admin details
            .addCase(getPermissions.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPermissions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.permissions = action.payload; 
            })
            .addCase(getPermissions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Delete Permissions
           
            .addCase(deletePermission.fulfilled, (state, action) => {
                console.log("State.data",state.permissions); 
                console.log("State.permission",action);

                state.permissions = state.permissions?.filter((permission) => permission?.data?._id !== action.payload?._id);
                })
                
                // Post Roles

                .addCase(addRoles.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(addRoles.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.role = state.role?.concat(action.payload);
                })
                .addCase(addRoles.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message;
                })

                  // Delete Role
           
            .addCase(deleteRoles.fulfilled, (state, action) => {
                console.log("State.data",state.permissions); 
                console.log("State.permission",action);

                state.role = state.role?.filter((roles) => roles?.data?._id !== action.payload?._id);
                })

    }
});

export default usersSlice.reducer;
