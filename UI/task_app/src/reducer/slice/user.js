import { createSlice } from "@reduxjs/toolkit";
import utils from "../../common/utils";
import constants from "../../common/constants";

const initialState = {
    user: null,
    token: null,
    isLoading: true,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            const { user } = action.payload;
            state.user = user;
            state.isLoading = false;
        },
        setTokenAndUser(state, action) {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;

            utils.setItemToStorage(token, constants.storageKey.tokenKey);
            state.isLoading = false;
        },
        setToken(state, action) {
            const { token } = action.payload;
            if (token) {
                state.token = token;
            } else {
                state.isLoading = false;
            }
        },
        logout(state) {
            state.token = null;
            state.user = null;

            utils.clearStorage();
        }
    },
});

export const { setUser, setTokenAndUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
