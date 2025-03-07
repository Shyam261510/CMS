import { TeamMember } from "@/components/team-card";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AllUsers {
  id: string;
  name: string;
  organization?: {
    id: string;
    organizationName: string;
  };
  role?: string;
  leaves: [];
  teamMembers?: TeamMember[];
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

  allUsers: [] as AllUsers[],
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
    setAllUsers: (state, action: PayloadAction<AllUsers[]>) => {
      state.allUsers = action.payload;
    },
  },
});

export const {
  setUserData,
  setOrganization,
  setisFetch,
  setLoading,
  setTeam,
  setAllUsers,
} = userSlice.actions;
export default userSlice.reducer;
