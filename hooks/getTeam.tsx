"use client";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setTeam } from "@/lib/dataSlice";

export const getTeamData = (organizationId: string) => {
  const dispatch = useDispatch();
  const isFetch = useSelector((state: any) => state.userSlice.isFetch);
  useEffect(() => {
    async function getTeam() {
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `/api/getTeam?organizationId=${organizationId}`
        );
        const teamData = result.data.team;

        if (teamData) {
          dispatch(setTeam(teamData));
        }
      } catch (error: any) {
        console.log(`Error Occur while getting Team ${error.message}`);
      } finally {
        dispatch(setLoading(false));
      }
    }
    getTeam();
  }, [dispatch, organizationId, isFetch]);
};
