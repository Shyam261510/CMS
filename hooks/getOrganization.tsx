"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setOrganization } from "@/lib/dataSlice";
import { useSession } from "next-auth/react";

import axios from "axios";
export const getOrganization = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userSlice.userData);
  const isFetch = useSelector((state: any) => state.userSlice.isFetch);
  const { status } = useSession();

  // checking if User join any Organization or not
  useEffect(() => {
    if (userData.id) {
      const getOrganization = async () => {
        try {
          dispatch(setLoading(true));
          const result = await axios.get(
            `/api/getOrganization?id=${userData.id}`
          );

          dispatch(setOrganization(result.data.organization));
        } catch (e) {
          console.error(`Error Occur while getting organization`);
        } finally {
          dispatch(setLoading(false));
        }
      };
      getOrganization();
    }
  }, [status, userData, isFetch]);
};
