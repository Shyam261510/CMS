import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
  image: string;
}

const initialState = {
  userData: {
    id: "",
    name: "",
    email: "",
    image: "",
  },
  isFetch: false as boolean,
  organization: {} as any,
  isLoading: false as boolean,
  team: [] as any,
};

const userSlice = createSlice({
  name: "userSlice", // ✅ Corrected name
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.userData = action.payload;
    },
    setOrganization: (state, action: PayloadAction) => {
      state.organization = action.payload;
    },
    setisFetch: (state, action: PayloadAction<boolean>) => {
      state.isFetch = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTeam: (state, action: PayloadAction) => {
      state.team = action.payload;
    },
  },
});

export const { setUserData, setOrganization, setisFetch, setLoading, setTeam } =
  userSlice.actions;
export default userSlice.reducer;
