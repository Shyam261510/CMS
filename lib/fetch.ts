import { useSelector } from "react-redux";
import {
  setLoading,
  setUserData,
  setOrganization,
  setAllUsers,
  setTeam,
} from "./dataSlice";
import axios from "axios";

const userData = useSelector((state: any) => state.userSlice.userData);

// export const getUser = async () => {

// };

// export const getOrganization = async () => {
//   try {
//     dispatch(setLoading(true));
//     const result = await axios.get(`/api/getOrganization?id=${userData.id}`);

//     dispatch(setOrganization(result.data.organization));
//   } catch (e) {
//     console.error(`Error Occur while getting organization`);
//   } finally {
//     dispatch(setLoading(false));
//   }
// };
// export const fetchAllUsers = async () => {
//   const result = await axios.get("/api/getUsers");

//   dispatch(setAllUsers(result.data.allUsers));
// };

// export async function getTeam(organizationId: string) {
//   try {
//     dispatch(setLoading(true));
//     const result = await axios.get(
//       `/api/getTeam?organizationId=${organizationId}`
//     );
//     const teamData = result.data.team;

//     if (teamData) {
//       dispatch(setTeam(teamData));
//     }
//   } catch (error: any) {
//     console.log(`Error Occur while getting Team ${error.message}`);
//   } finally {
//     dispatch(setLoading(false));
//   }
// }
